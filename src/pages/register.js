import React from "react";

function Register() {

  return (
    <div className="registerpage">
      <div className="registertitle">
        회원가입
      </div>
      <hr className="divider" />
      <div className="registercontent">
        <form>
          <div className="registersubtitle">
            아이디
          </div>
          <div className="registerid">
            <input name="" className="registerinput" placeholder="ID를 입력하세요." />
            <button className="btnCss2" type="submit">중복확인</button>
          </div>
          <div className="registerpw">
            <div className="registersubtitle">
              패스워드
            </div>
            <div className="registerpw1">
              <input name="" className="registerinput" placeholder="PW를 입력하세요." />
            </div>
            <div className="registerpw2">
              <input name="" className="registerinput" placeholder="한번더!" />
            </div>
            <hr className="divider" />
            <div className="registersubtitle">
              학번, 이름
            </div>
            <div className="registerpw2">
              <input name="" className="registerinput" placeholder="학번" />
              <input name="" className="registerinput" placeholder="이름" />
            </div>
          </div>
          <hr className="divider" />
          <button className="loginBtn" type="submit">가입하기</button>
        </form>
      </div>
    </div>
  )
}

export default Register;