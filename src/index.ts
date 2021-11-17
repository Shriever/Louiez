import 'dotenv/config';
import puppeteer from 'puppeteer';
import { BOOKING_URL } from './const';

const sleep = (delay: number = 1) => {
  return new Promise(resolve => setTimeout(resolve, delay * 1000));
};
// parking is $2 per hour, no reservation, off site, public
// const languages = ['english', 'spanish'];
const data = {
  airbnbLink:
    'https://www.airbnb.com/rooms/32474818? * source_impression_id=p3_1636671547_Ta7OAbmm6TflKjzk',
  apartmentNumber: 5,
  price: 110,
  businessTaxReceiptNumber: '123abc',
  resortTaxRegistrationCertificateNumber: '123abc',
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const phoneSelectorValue = 'cba84b379c459e868f2b8da5c1f7df8c';
  await page.goto(BOOKING_URL);

  await page.type('#loginname', process.env.EMAIL as string);

  await page.click('.bui-spacer button._2emQHDWTNbBMVHK80Tj0A2');

  await page.waitForNavigation();
  await page.type('#password', process.env.PASSWORD as string);

  await page.click('form button._2emQHDWTNbBMVHK80Tj0A2');
  await page.waitForNavigation();
  await sleep();

  await page.click('.nw-sms-verification-link');

  await page.select('#selected_phone', phoneSelectorValue);

  await page.click('.bui-spacer button._2emQHDWTNbBMVHK80Tj0A2.nv-request-tfa');

  await sleep(30);
  // await page.

  await Promise.all([
    page.waitForNavigation(),
    page.click('button.bui-button span.bui-button__text'),
  ]);

  await page.click(
    '#automation_id_choose_category_QUICK_START_APARTMENT_SUP > .card'
  );
  await page.waitForNavigation();

  await page.click('#automation_id_nav_button_forward');
  await page.waitForNavigation();
  await page.click('#automation_id_nav_button_forward');
  await page.waitForNavigation();

  await page.click(
    '._1X4Mma_goXAEy3ePAPS7v_.automation_class_otaq_airbnb_input'
  );

  await page.type('.airbnb-link-input__input input', data.airbnbLink);
  await page.click('.airbnb-link-input__button');

  await page.waitForSelector(".automation_input_airbnb_block_success")

  await page.click('#automation_id_nav_button_forward');
  await page.waitForNavigation();

  await sleep(15); // Time to verify that the name is valid


})();
