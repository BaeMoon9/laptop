import React, { useState } from "react";
import Navbarpage from "./navpage";

function HowtoRent() {

	const [btn, setBtn] = useState(1)

	const guestBtn = () => {
		setBtn(0) //비회원 대여 0
	}

	const userBtn = () => {
		setBtn(1) //회원대여 1
	}

	return (
		<div>
			<Navbarpage />
			<div className="howtorentpage">
				<div className="registerpage">
					<div className="registertitle">
						대여방법
					</div>
					<div className="howtorentnav">
						{
							btn === 0
								? <div className="howtorentbtncontain">
									<button className="howtorentsubtitleonclick" onClick={() => guestBtn()}>
										비회원대여
									</button>
									<button className="howtorentsubtitle" onClick={() => userBtn()}>
										회원대여
									</button>
								</div>
								: <div className="howtorentbtncontain">
									<button className="howtorentsubtitle" onClick={() => guestBtn()}>
										비회원대여
									</button>
									<button className="howtorentsubtitleonclick" onClick={() => userBtn()}>
										회원대여
									</button>
								</div>
						}
					</div>
					<hr className="divider2" />
				</div>
			</div>
		</div>
	)
}

export default HowtoRent