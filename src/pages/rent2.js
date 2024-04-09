import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

function Rent2() {


    return (
        <div className="rentpage">
            <div className="registertitle">
                노트북 대여 신청서
            </div>
            <div className="rentpledgecontainer">
                <div className="rentsubtitle">[개인정보 수집 및 이용 동의]</div>
                <div className="rentcontent">
                    1. 개인정보 수집 및 이용 목적 : 본인 확인 및 대여 기록 관리
                </div>
                <div className="rentcontent">
                    2. 수집하는 개인정보의 항목 : 소속, 학번, 이름, 휴대폰번호
                </div>
                <div className="rentcontent">
                    3. 개인정보의 보유 및 이용기간 : 1년
                </div>
                <div className="rentcontent">
                    4. 동의 거부 권리 안내 : 귀하는 본 개인정보 수집 및 이용 동의에 거부할 권리가 있습니다. 단, 동의를 거부할 경우에는
                    대여가 어려울 수 있습니다.
                </div>
                <div>개인정보의 수집 및 이용에 동의하십니까?</div>
                <hr className="divider" />
                <div className="userrentinfo">
                    <div className="rentcontain1">
                        <div className="registersubtitle">학번</div>
                        <div className="renterinfo">123</div>
                    </div>
                    <div className="rentcontain1">
                        <div className="registersubtitle">이름</div>
                        <div className="renterinfo">123</div>
                    </div>
                </div>
                <div className="userrentinfo">
                    <div className="rentcontain1">
                        <div className="registersubtitle">전화번호</div>
                        <div className="renterinfo">123</div>
                    </div>
                    <div className="rentcontain1">
                        <div className="registersubtitle">이메일</div>
                        <div className="renterinfo">123</div>
                    </div>
                </div>
                <div className="userrentinfo">
                    <div className="registersubtitle">주소</div>
                    <div className="renterinfo">123</div>
                </div>
                <hr className="divider" />
                <div className="rentsubtitle2">대여 노트북 정보</div>
                <div className="rentcontain2">
                    <div className="registersubtitle">일련번호</div>
                    <div className="renterinfo">123</div>
                </div>
                <div className="rentcontain2">
                    <div className="registersubtitle">노트북명</div>
                    <div className="renterinfo">123</div>
                </div>
                <hr className="divider" />
            </div>
        </div>
    )
}

export default Rent2;