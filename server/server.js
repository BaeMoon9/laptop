const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt')


const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const bodyParser = require('body-parser')

app.use(passport.initialize())
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 60 * 60 * 1000 }
}))

app.use(passport.session())

app.use(express.json());
// app.use(express.urlencoded({ extended: false}))
var cors = require('cors');
app.use(cors({}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8081, function () {
	console.log('listening 8081')
});


const mariadb = require('mariadb');

const pool = mariadb.createPool(
	{
		host: '221.142.94.196',
		port: 3306,
		user: 'user2',
		password: 'mysql',
		database: 'rentlaptopservice',
		allowPublicKeyRetrieval: 'true',
		waitForConnections: false,
		connectionLimit: 5
	}
);

pool.getConnection(function (err, connection) {
	if (err)
		throw err;
	else {
		connection.query("query;", function (err, resuㅁlts) {
			if (err)
				throw err;
			else
				console.log(results);
		});
		connection.release() //연결 반납, 해제X
	}
});

app.use(express.static(path.join(__dirname, 'rentlaptop/build')));

//아이디 비번 검증
passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	session: true
}, async (username, password, cb) => {
	//console.log(username, password, cb)
	//console.log(password)
	try {
		let result = await pool.query('select * from User where user_id = ?', username)
		//console.log('result값 : ', result)
		//console.log('result변수의 user_pw', result[0]) //result[0]을 안하니까 [괄호]가 안 벗어나짐
		//console.log('입력한비번', password)
		if (!result) {
			console.log('ID 없음')
			return cb(null, false, { message: 'ID is not on DB' })
		}
		//result[0].user_pw == password
		if (await bcrypt.compare(password, result[0].user_pw)) { //해시된 비번 비교
			console.log('성공')
			return cb(null, result)
		} else {
			console.log('비번틀림')
			return cb(null, false, { message: "비번틀림" });
		}
	} catch (e) {
		console.log(e)
		return cb(null, false, { message: "없는아이디거나 비밀번호가 틀립니다." })
	}
}))

passport.serializeUser((user, done) => {
	//console.log('serializeUser(user) : ', user)
	//console.log(user[0])
	process.nextTick(() => {
		done(null, { id: user[0].user_id, studentid: user[0].student_id, username: user[0].name, phone: user[0].phone_num }) //로그인시 정보 전달
	})
})

passport.deserializeUser((user, done) => {
	//let result = await pool.query('select * from User where user_id = ?', user.id)
	//console.log('user :', user)
	process.nextTick(() => {
		return done(null, user)
	})
})


// const test = pool.query("select * from test1")
app.get("/", async (req, res) => {
	//async, awiat 안쓰면 결과값이 pending되어 가져오지못함 ----> Promise { <pending> } 이런식으로

	res.sendFile(path.join(__dirname, '/rentlaptop/build/index.html'));
	// let test = await pool.query("select * from test1")
	//res.send(test)
	//console.log(test)
})

app.get('/laptopspecs', async (req, res) => {
	let test = await pool.query('select * from LaptopSpec')
	//console.log(json(test))
	//console.log(test);
	res.json(test);
})

app.get('/laptopdatabases', async (req, res) => {
	let db1 = await pool.query('select * from LaptopDetail')
	//console.log(db1)
	res.json(db1)
})

app.post('/login1', async (req, res, next) => {
	console.log('req.body : ', req.body)
	passport.authenticate('local', (error, user, info) => {
		//console.log(user)
		if (error) {
			console.log(error)
			// return res.status(500).json(error)
			return res.send("<script>alert('오류 : 관리자에게 문의 바랍니다.'); window.location.replace('/login')</script>")
		}
		if (!user) {
			//console.log('!user', user)
			// return res.status(401).json(info.message)
			return res.send("<script>alert('없는아이디거나 비밀번호가 틀립니다.'); window.location.replace('/login')</script>");
		}
		req.logIn(user, (err) => {
			if (err) {
				return next(err)
			}

			res.redirect('/')
			console.log('로그인성공')
		})
	})(req, res, next)

})

app.get('/userpage', async (req, res) => {
	console.log('app.get userpage', req.user)
	res.json(req.user)
})

app.get('/userrented', async (req, res) => {
	try {
		let db1 = await pool.query('select * from LaptopDetail where rent_name = ? and rent_student_id = ?',
			[req.user.username, req.user.studentid]) //유저이름 학번으로 조회해서 대여중인 노트북 조사하기
		console.log('유저가 빌린 노트북 정보', db1)
		//console.log('req user 이름 불러오기', req.user)
		res.json(db1)
	} catch (e) {
		console.log('조회 실패 : 대여목록없음 ', e) //대여가없는 아이디 조회를 위한 예외처리
		res.json(null)
	}
})

app.get('/logout', async (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		} else {
			req.session.destroy();
			res.clearCookie('connect.sid')
			res.redirect('/')
			console.log('logout')
		}


	});
})

app.get('/checkid', async (req, res) => {
	try {
		console.log('req : ', req.query)
		let check = await pool.query('select * from User where user_id = ?',
			req.query.checkNewId)
		console.log('check[0].user_id ==>', check[0].user_id)
		res.json(check[0].user_id)
	} catch (e) { //db조회 실패시 --> 아이디중복아니기때문에 null을 전달해서 컨트롤
		console.log('TypeError ==>', e)
		res.json(null)
	}

})

app.post('/newregister', async (req, res) => {

	let hashed = await bcrypt.hash(req.body.newpassword, 10)
	console.log('bcrypt hashed', hashed)

	try {
		console.log(req.body)
		await pool.query('insert into User values (?, ?, ?, ?, ?)',
			[req.body.userid, hashed, req.body.studentid, req.body.studentname, req.body.phonenum]
		)
		res.redirect('/')

	} catch (e) {
		console.log(e)
		res.json({ message: 'failed' })
	}
})

app.post('/guestdevicerent', async (req, res) => {
	try {
		console.log('게스트노트북신청', req.body)
		await pool.query('insert into RentApply values(?, ?, ?, ?, ?)',
			[req.body.laptopnum, req.body.laptopname, req.body.studentname, req.body.studentid, req.body.studentphone]
		)
		res.send("<script>alert('신청이 완료되었습니다.'); window.location.replace('/')</script>")
	} catch (e) {
		console.log(e)
		res.json(e)
	}
})

app.post('/userdevicerent', async (req, res) => {

	console.log('deviceresult', req.body)

	try {
		await pool.query('insert into RentApply values (?, ?, ?, ?, ?)',
			[req.body[1].ync_num, req.body[1].name, req.body[0].username, req.body[0].studentid, req.body[0].phone]
		)
		console.log('신청 성공')
		res.json(res)
	} catch (e) {
		//console.log('신청 실패', e)
	 	res.json(e)
	}
})


app.post('/test123', async (req, res) => {
	console.log('result', req.body)
})

app.get('/rentapply', async (req, res) => {
	try {
		let result = await pool.query('select * from RentApply')
		console.log('applydata', result)
		res.json(result)
	} catch (e) {
		console.log(e)
		res.json({ message: '요청된 데이터가 없거나 실패하였습니다.' })
	}
})

app.post('/applybtn', async (req, res) => {
	console.log('apply : req', req.body)
	try {
		await pool.query('update LaptopDetail set status = ? , rent_name = ?, rent_student_id = ?, student_phone_num = ? where ync_num = ?',
			['대여중', req.body.student_name, req.body.student_num_id, req.body.phone_num, req.body.laptop_num],
			await pool.query('delete from RentApply where student_num_id = ?', req.body.student_num_id),
		)
	} catch (e) {
		console.log(e)
		res.json({ message: '승인요청에러' })
	}
	try {
		let db1 = await pool.query('select * from RentApply')
		res.json(db1)
	} catch (e) {
		console.log('조회에러 /applybtn', e)
	}
})

app.post('/returnbtn', async (req, res) => {
	try {
		await pool.query('update LaptopDetail set status = ?, rent_name = ?, rent_student_id = ?, student_phone_num = ? where ync_num = ?',
			['대여가능', '', null, null, req.body.ync_num]
		)
	} catch (e) {
		console.log('return failed', e)
	}
	try {
		let db1 = await pool.query('select * from LaptopDetail where rent_student_id is not null')
		res.json(db1)
	} catch (e) {
		console.log('조회에러 /returnbtn', e)
	}
})

app.get('/laptoprentedbyuser', async (req, res) => {
	let db2 = await pool.query('select * from LaptopDetail where rent_student_id is not null')
	res.json(db2)
})

app.get('/userwantedapply', async (req, res) => {
	// console.log('로그인정보', req.query.studentnum)
	console.log('req.user', req.user)
	try {
		let result = await pool.query('select * from RentApply where student_num_id = ?', req.user.studentid)
		console.log('result', result)
		res.json(result)
	} catch (e) {
		console.log('사용자 신청현황 db 에러')
	}
})

app.post('/addlist', async (req, res) => {
	console.log(req.body)

	try {
		await pool.query('insert into LaptopDetail values (?, ?, ?, ?, ?, ?, ?)',
			[req.body.yncnum, req.body.name, req.body.year, req.body.status, '', null, null]
		)
		return res.send("<script>alert('등록이 완료되었습니다.'); window.history.back()</script>");
	} catch (e) {
		console.log(e)
		res.json({ message: '오류로 인한 신청 실패' })
	}
})

app.post('/updatelist', async (req, res) => {
	console.log(req.body)

	try {
		await pool.query('update LaptopDetail set rent_student_id = ?, rent_name = ?, student_phone_num = ?, status = ? where ync_num = ?',
			[req.body.studentnum, req.body.studentname, req.body.phone, req.body.status, req.body.yncnum]
		)
		return res.send("<script>alert('업데이트가 완료되었습니다.'); window.history.back()</script>");
	} catch (e) {
		console.log(e)
		res.json({ message: '오류로 인한 신청 실패' })
	}
})

app.post('/deletelaptoplists', async (req, res) => {
	console.log(req.body)
	try {
		await pool.query('delete from LaptopDetail where ync_num in (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
			[req.body[0], req.body[1], req.body[2], req.body[3], req.body[4], req.body[5], req.body[6], req.body[7], req.body[8], req.body[9]]
		) //어짜피 한번에 한페이지씩(쵀대10개) 밖에 못지워서 이렇게했는데 map함수 쓰는 방법이 있을까?
		return res.send("<script>alert('삭제되었습니다.'); window.history.back()</script>");
		// console.log('결과', result)
	} catch (e) {
		return res.send("<script>alert('오류발생.');</script>");
		// console.log(e)
	}

})

app.post('/findyourid', async (req, res) => {
	console.log('findyourid', req.body)

	try {
		let result = await pool.query('select user_id from User where student_id = ? and name = ?', 
			[req.body[0], req.body[1]]
		)
		res.json(result)
	}catch (e) {
		return res.send("<script>alert('오류발생 관리자에게 문의 바랍니다.'); window.location.reload()</script>");
	}
})

app.get('*', function (req, res) { //
	res.sendFile(path.join(__dirname, './rentlaptop/build/'));
})


