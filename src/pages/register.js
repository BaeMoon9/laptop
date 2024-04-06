import React, { useState } from "react";
import axios from "axios";

function Register() {

  const [checkNewId, setCheckID] = useState()
  const [validId, setValidId] = useState(null)

  const checkID = async () => {
    console.log('중복검색할 아이디 : ', checkNewId)
    if(!checkNewId) {
      setValidId(null)
      console.log('아이디미입력') //중복확인 아이디 미입력시 validId null 반환
    } else {
      await axios.get('http://localhost:8081/checkid', { params: { checkNewId } }).then((result) => {
      console.log('result.data : ', result.data)

      if (result.data === checkNewId) {
        setValidId(false)
        console.log('중복임', result.data, checkNewId, validId)
      }
      else {
        setValidId(true)
        console.log('중복아님', result.data, checkNewId, validId)
      }
    }).catch(() => {
      console.log('failed')
    })
    }
  }




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
            <input name="userid" type="text" value={checkNewId}
              className="registerinput" placeholder="ID를 입력하세요."
              onChange={(e) => {
                setCheckID(e.target.value)
                console.log(checkNewId)
              }}
            />
            <button type="button" className="btnCss2" onClick={checkID}>중복확인</button>
          </div>
          {
            validId === null
              ? <div className="needuseid">아이디를 입력해주세요</div>
              : (validId === false ?
                <div className="cantuseid">사용중인 아이디 입니다.</div>
                : <div className="canuseid">사용 가능한 아이디 입니다.</div>
              )
          }
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