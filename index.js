const puppeteer = require( 'puppeteer');

async function scrape(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://replit.com/bounties?order=creationDateDescending');

  // Extract data from the page
  const title = await page.title();
  const notif = await page.evaluate(()=>{
        const data = document.querySelectorAll(".css-ph3dp7")
        const latest = data[1] 
        const title = latest.querySelector("h3").textContent
        const price = latest.querySelector(".css-1hlae9s").textContent
        const timeRemaining = latest.querySelector(".css-1pwjctj").textContent
        const status = latest.querySelector(".css-1q8df27").textContent
        const description = latest.querySelectorAll(".css-piqrc")[1].textContent
        const timePosted = latest.querySelectorAll(".css-piqrc")[4].textContent
        const numberOfApplicants = latest.querySelectorAll(".css-piqrc")[5].textContent
        const bountyURL = document.querySelectorAll(".css-r3eef3")[0].href

        details = {
            title : title,
            price : price,
            time_remaining : timeRemaining,
            status : status,
            description : description,
            time_posted : timePosted,
            number_of_applicants : numberOfApplicants,
            url : bountyURL
        }

        return details
  })
//   console.log(notif)


  await browser.close();
  return notif
}

module.exports  = scrape