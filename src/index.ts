import 'dotenv/config';
import puppeteer from 'puppeteer';
import { BOOKING_URL, CREATE_LISTING_URL, LOCATION } from './const';

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

  // LOGIN
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

  // ADD NEW PROPERTY LISTING

  await page.goto(CREATE_LISTING_URL);
  // await Promise.all([
  //   page.waitForNavigation(),
  //   page.click('button.bui-button span.bui-button__text'),
  // ]);
  // await page.click('button.bui-button span.bui-button__text');
  // await page.waitForNavigation();
  // SELECT APARTMENT TYPE
  await page.click(
    '#automation_id_choose_category_QUICK_START_APARTMENT_SUP > .card'
  );
  await page.waitForNavigation();

  await page.click('#automation_id_nav_button_forward');
  await page.waitForNavigation();
  await page.click('#automation_id_nav_button_forward');
  await page.waitForNavigation();

  // IMPORT AIRBNB LISTING
  await page.click(
    '._1X4Mma_goXAEy3ePAPS7v_.automation_class_otaq_airbnb_input'
  );

  await sleep(45);
  await page.type('.airbnb-link-input__input input', data.airbnbLink);
  await page.click('.airbnb-link-input__button');

  await page.waitForSelector('.automation_input_airbnb_block_success');

  await page.click('#automation_id_nav_button_forward');
  await page.waitForNavigation();

  // PROPERTY NAME AND LOCATION
  await sleep(15); // Time to verify that the name is valid

  await page.click('.form-buttons-container--primary button');
  await page.waitForNavigation();

  await page.type('#address-autocomplete', LOCATION);
  await page.waitForSelector('button.autocomplete-suggestions__btn');
  await page.click('button.autocomplete-suggestions__btn');

  await sleep(3);
  console.log('Primary button 1');
  await Promise.all([
    await page.click('.form-buttons-container--primary button'),
    await page.waitForNavigation(),
  ]);
  // await page.click('.form-buttons-container--primary button');
  // await page.waitForNavigation();

  console.log('Primary button 2');
  await Promise.all([
    await page.click('.form-buttons-container--primary button'),
    await page.waitForNavigation(),
  ]);
  // await page.click('.form-buttons-container--primary button');
  // await page.waitForNavigation();

  console.log('Primary button 3');
  await Promise.all([
    await page.click('.form-buttons-container--primary button'),
    await page.waitForNavigation(),
  ]);
  // await page.click('.form-buttons-container--primary button');
  // await page.waitForNavigation();

  // PROPERTY SETUP
  console.log('automation');
  await page.click(
    '#automation_id_CheckboxList-amenity_id-123facility_id-15 label'
  );

  await page.click('.form-buttons-container--primary button');
  await page.waitForNavigation();

  await page.click('.form-buttons-container--primary button');
  await page.waitForNavigation();

  await page.click('#automation_id_parking_paid div');

  await page.type('#automation_id_parking_input_container', '2');

  await page.select('.a417f321ec select', 'hour');

  await page.click('#automation_id_parking_offsite div');

  await page.click('#automation_id_parking_public div');

  await page.click('.form-buttons-container--primary button');
  await page.waitForNavigation();

  await page.click('#automation_id_recommended_group > div > div:nth-child(1)');
  await page.click('#automation_id_recommended_group > div > div:nth-child(2)');

  await page.click('.form-buttons-container--primary button');
  await page.waitForNavigation();

  await page.click('.form-buttons-container--primary button');
  await page.waitForNavigation();

  await page.click('.b777be90c1 > label._0ae3340ab3');

  // ADD PHOTOS
})();
