/*eslint-disable*/
import React from "react";
import { Routes, Route} from 'react-router-dom';
import LoginPage from './login.js';
import Home from "./home.js";
import ListTable from "./list.js";
import LaptopList from "./laptopList.js";
import MyPage from "./mypage.js";
import Register from "./register.js";
import Rent from "./rent.js";
import Rent2 from "./rent2.js";
import Approve from "./approve.js";
import Test1 from "./test1.js";
import ApproveUser from "./approveUser.js";
import FindID from "./findid.js";
import GuestRent from "./guestrent.js";
import GuestRent2 from "./guestrent2.js";
import Navbarpage from "./navpage.js";


function MainPage() {

	return (
		<div className="main">
			<Navbarpage />
			<div className="Components">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/findid" element={<FindID />} />
					<Route path="/approve" element={<Approve />} />
					<Route path="/approveUser" element={<ApproveUser />} />
					<Route path="/register" element={<Register />} />
					<Route path="/mypage" element={<MyPage />} />
					<Route path="/rent" element={<Rent />} />
					<Route path="/rent2" element={<Rent2 />} />
					<Route path="/guestrent" element={<GuestRent />} />
					<Route path="/guestrent2" element={<GuestRent2 />} />
					<Route path="/test1" element={<Test1 />} />
					<Route path="/home" element={<Home />}>
						<Route path="detail" element={<LaptopList />} />
					</Route>
					<Route path="/list" element={<ListTable />} />			
				</Routes>
			</div>
			<div className="mainfooter">
				<div className="footcontainer">
					<div className="ynclogo">
						영남이공대학교
					</div>
					<p>대구광역시 남구 현충로 170(대명동) 영남이공대학교 컴퓨터정보관3층 실습준비실3 Tel : 053-650-9255
						<br />
						Copyrightⓒ 2023 Yeungnam University College All Rights Reserved
					</p>
				</div>
			</div>
		</div>
	)
}

export default MainPage;