import React from "react";
import axios from "axios";

function Test1 () {


return(
	<div>
		<button onClick={() => {
			const test1 = {
				id : "TES"
			}
		
			axios.post('http://localhost:8081/test123/', test1, {
				headers : {'Content-Type' : 'application/json'},
				responseType: 'text'
			})
					.then((res) => {
						console.log(res.data)
					}).catch((e) => {
						console.log(e)
					})
		}}>axios122</button>
	</div>
)


}

export default Test1;