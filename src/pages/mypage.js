import React from "react";

function MyPage() {
  return (
    <div className="mypage">
      <div className="userinfo">
        <div className="usr-account">
          <h3>Mypage</h3>
        </div>
        <div className="usr-id">
          <div className="usr-title">
          <h4>ID</h4>
          </div>
          <div className="usr-content">
            <div className="usr-content-data">123123123</div>
          </div>
        </div>
        <div className="usr-pw">
          <div className="usr-title">
         <h4>PW</h4>
          </div>
          <div className="usr-content">
            <div className="usr-content-data">123123123</div>
            <button>변경하기</button>
          </div>
        </div>
        <div className="usr-email">
          <div className="usr-title">
          <h4>E-mail</h4>
          </div>
          <div className="usr-content">
            <div className="usr-content-data">123123123</div>
            <button>변경하기</button>
          </div>
        </div>
        <div className="usr-email">
          <div className="usr-title">
          <h4>E-mail</h4>
          </div>
          <div className="usr-content">
            <button>변경하기</button>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="rentlist">
        <h3>대여목록</h3>
      </div>
    </div>
  )
}

export default MyPage;