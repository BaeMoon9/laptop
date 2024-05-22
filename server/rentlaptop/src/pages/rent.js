import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "./scrollToTop";
import Navbarpage from "./navpage.js";

function Rent() {
	const navigate = useNavigate()
	const location = useLocation()

	console.log('노트북 정보2', location.state.laptop)
	// const [laptopinfo, setLaptopinfo] = useState()
	// setLaptopinfo(location.state.laptop)
	// console.log('노트북 이름', laptopinfo)

	const [userData, setUserData] = useState([])
	const today = new Date();
	const nowdate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;


	useEffect(() => {
		axios.get('http://221.142.94.196:8081/userpage').then((result) => {
			setUserData(result.data)
		}).catch(() => {
			console.log('failed')
		})
	}, [])

	console.log(userData)

	const nextBtn = (name) => {
		console.log('name', name)
		navigate('/rent2', { state: { name } })
	}

	return (
		<div>
			<Navbarpage />
			<div className="rentpage">
				<ScrollToTop />
				<div className="registertitle">
					노트북 대여 서약서
				</div>
				<div className="rentpledgecontainer">
					<div className="rentsubtitle">노트북 대여 제도 시행 지침</div>
					<div className="rentsubhead">제 1 조 (목적)</div>
					<div className="rentcontent">
						본 시행 지침은 개인 노트북 보유 및 그 활용에 대한 활성화를 위한 노트북 대여와 관련된 시행상 주요 지침의 제정을 목적으로 한다.
					</div>
					<div className="rentsubhead">제 2 조 (정의)</div>
					<div className="rentcontent">
						노트북 대여라 함은 영남이공대학교 소프트웨어융합과에서 확보한 노트북을 재학생들에게 대여함을 말한다.
					</div>
					<div className="rentsubhead">제 3 조 (대여기관)</div>
					<div className="rentcontent">
						소프트웨어융합과에서는 신청접수, 기기의 대여, 반납 등의 제반 업무를 수행한다. 대여 및 반납 업무 수행 시 반드시 물품에
						대한 이상 유무를 대여학생에게 사전 확인 절차를 거친 후 시행한다.
					</div>
					<div className="rentsubhead">제 4 조 (대여대상)</div>
					<div className="rentcontent">
						대여 대상은 당해 연도 학기 등록을 필한 학생(휴학생 제외)으로&nbsp;
						<p className="importantcontent">개인 노트북이 없는 학생에 한하여&nbsp;</p>
						대여일 현재 재학 상태의 학생으로 제한한다.
					</div>
					<div className="rentsubhead">제 5 조 (대여기간 및 사용)</div>
					<div className="rentcontent">
						<p className="importantcontent">1인당 노트북 1대 대여, 한학기 대여가 원칙(타인 양도 불가)이다.</p>
					</div>
					<div className="rentsubhead">제 6 조 (대여비용 및 파손책임)</div>
					<div className="rentcontent">
						대여는 기본적으로 무료로 한다.&nbsp;<p className="importantcontent" >다만, 대여 기기의 분실(도난) 및 파손이
							발생한 경우, 실습준비실에 알리고 대여자 본인은 기기의 원상태 복구에 대한 비용을 부담해야한다.(미변상시 변상 시까지 대여 불가,
							학사 제한 조치)</p>
					</div>
					<div className="rentsubhead">제 7 조 (신청 및 확인)</div>
					<div className="rentcontent">
						대여를 희망하는 학생은 실습준비슬을 방문하여 학과 조교에게 학생증(또는 신분증, 학생증 미소지시 원스탑 페이지 제시)제시,
						본인 확인 후 서약서 및 신청서를 작성하고 물품을 수령한다. 물품수령전
						물품에 이상이 있는지 반드시 확인하여야하며, 서약서 작성시 개인정보를 올바르게 작성하지 않을 경우 대여를 제한한다.
					</div>
					<div className="rentsubhead">제 8 조 (개인정보 변경 및 학적 변동)</div>
					<div className="rentcontent">
						<p className="importantcontent">학기 중 휴대전화 번호의 변경이 있을 시 실습준비실에 방문하여 반드시 번호 변경 사실을 알려야 한다.
							또한, 휴학 등의 학적 변동이 있을 경우 즉시 실습준비실에 방문하여 노트북을 반납한다.
						</p>
					</div>
					<div className="rentsubhead">제 9 조 (반납)</div>
					<div className="rentcontent">
						반납기한은 매 학기 기말고사 시험 전 별도의 공지를 통해 안내한다.&nbsp;
						<p className="importantcontent">반납기간은 학기가 끝나고 1주일뒤까지 반납기간으로 정한다.&nbsp;
							반납시 실습준비실에 본인이 직접 방문해서 반납을 해아한다.(대리반납 불가능) 반납시 노트북 파손 여부 및 정상작동 확인을 진행한다.
							위 과정에서 파손 및 이상 발견시 원상복구 비용이 청구될 수 있다.<br />
							반납기간 이후로 반납시 다음 학기 대여가 불가능하다.
						</p>
					</div>
					<hr className="divider" />
					<div className="applicationcontent">
						<div className="signcontent">
							본인은 노트북 대여 제도 시행 지침을 충분히 이해하였고, 특히 대여 후에 발생하는 분실 및 파손에 대한 제 6 조의 내용을 충분히
							확인하였으며 모든 노트북 대여 시행 지침을 성실히 준수할 것을 서약합니다.
						</div>
					</div>
					<div className="applicationdate">
						{nowdate}
					</div>
					<div className="registername">신청자 : {userData.username}</div>
				</div>
				<button className="btnCss1" onClick={() => nextBtn([location.state.laptop])}>다음</button>
			</div>
		</div>
	)
}

export default Rent;