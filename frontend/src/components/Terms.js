import { Heading, Text, Container, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useRef } from "react";
// import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";

function Terms() {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Heading size="lg">Terms and Condition</Heading>
      <Container maxW="container.lg">
        <Heading size="md">OVERVIEW</Heading>
        <Text>
          Thank you for joining Kamsin Collections. If you continue to browse
          and use Kamsincollections.com you are agreeing to comply with and be
          bound by the following terms and conditions of use, which together
          with our privacy policy govern our relationship with you in relation
          to this website.
          <br></br>
          This website is operated by Kamsin Collections throughout the site,
          the terms “we”, “us” and “our” refer to Kamsin Collections Private
          Ltd, a firm whose office is located at Luxa, Varanasi, Uttar
          Pradesh-221010. The term "you" refers to the user or viewer of our
          website. Kamsin Collections offers this website, including all
          information, tools and services available from this site to you, the
          user, conditioned upon your acceptance of all terms, conditions,
          policies and notices stated here.
        </Text>
        <Text>
          By visiting our site and/ or purchasing something from us, you engage
          in our “Service” and agree to be bound by the following terms and
          conditions (“Terms of Service”, “Terms”), including those additional
          terms and conditions and policies referenced herein and/or available
          by hyperlink. These Terms of Service apply to all users of the site,
          including without limitation users who are browsers, vendors,
          customers, merchants, and/ or contributors of content.
        </Text>
        <Text>
          Please read these Terms of Service carefully before accessing or using
          our website. By accessing or using any part of the site, you agree to
          be bound by these Terms of Service. If you do not agree to all the
          terms and conditions of this agreement, then you may not access the
          website or use any services. If these Terms of Service are considered
          an offer, acceptance is expressly limited to these Terms of Service.
        </Text>
        <Text>
          Any new features or tools which are added to the current store shall
          also be subject to the Terms of Service. You can review the most
          current version of the Terms of Service at any time on this page. We
          reserve the right to update, change or replace any part of these Terms
          of Service by posting updates and/or changes to our website. It is
          your responsibility to check this page periodically for changes. Your
          continued use of or access to the website following the posting of any
          changes constitutes acceptance of those changes.
        </Text>
        <Heading size="md">SECTION 1-ONLINE STORE TERMS</Heading>
        <Text>
          By agreeing to these Terms of Service, you represent that you are at
          least the age of majority in your state or province of residence, or
          that you are the age of majority in your state or province of
          residence and you have given us your consent to allow any of your
          minor dependents to use this site.
        </Text>
        <Text>
          You may not use our products for any illegal or unauthorized purpose
          nor may you, in the use of the Service, violate any laws in your
          jurisdiction (including but not limited to copyright laws).
          <br></br>
          <br></br>
          You must not transmit any worms or viruses or any code of a
          destructive nature.
          <br></br>A breach or violation of any of the Terms will result in an
          immediate termination of your Services.
        </Text>
        <Heading size="md">SECTION 2-General Conditions</Heading>
        <Text>
          We reserve the right to refuse service to anyone for any reason at any
          time.
        </Text>
        <Text>
          You understand that your content may be transferred unencrypted and
          involve (a) transmissions over various networks; and (b) changes to
          conform and adapt to technical requirements of connecting networks or
          devices.
        </Text>
        <Text>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit
          any portion of the Service, use of the Service, or access to the
          Service or any contact on the website through which the service is
          provided, without express written permission by us.
        </Text>
        <Text>
          The headings used in this agreement are included for convenience only
          and will not limit or otherwise affect these Terms.
        </Text>
        <Heading size="md">
          SECTION 3-ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
        </Heading>
        <Text>
          We are not responsible if information made available on this site is
          not accurate, complete or current. The material on this site is
          provided for general information only and should not be relied upon or
          used as the sole basis for making decisions without consulting
          primary, more accurate, more complete or more timely sources of
          information. Any reliance on the material on this site is at your own
          risk.
        </Text>
        <Text>
          This site may contain certain historical information. Historical
          information, necessarily, is not current and is provided for your
          reference only. We reserve the right to modify the contents of this
          site at any time, but we have no obligation to update any information
          on our site. You agree that it is your responsibility to monitor
          changes to our site.
        </Text>
        <Heading size="md">
          SECTION 4-MODIFICATIONS TO THE SERVICE AND PRICES
        </Heading>
        <Text>
          Prices for our products are subject to change without notice.
        </Text>
        <Text>
          We reserve the right at any time to modify or discontinue the Service
          (or any part or content thereof) without notice at any time.
        </Text>
        <Text>
          We shall not be liable to you or to any third-party for any
          modification, price change, suspension or discontinuance of the
          Service.
        </Text>
        <Heading size="md">SECTION 5-PRODUCTS OR SERVICES</Heading>
        <Text>
          Certain products or services may be available exclusively online
          through the website. These products or services may have limited
          quantities and are subject to return or exchange only according to our{" "}
          <Link
            className="font-weight-bold font-italic"
            onClick={executeScroll}
          >
            Returns and Exchange Policy
          </Link>
          .
        </Text>
        <Text>
          We have made every effort to display as accurately as possible the
          colors and images of our products that appear at the store. We cannot
          guarantee that your computer monitor’s display of any color will be
          accurate.
        </Text>
        <Text>
          We reserve the right, but are not obligated, to limit the sales of our
          products or Services to any person, geographic region or jurisdiction.
          We may exercise this right on a case-by-case basis. We reserve the
          right to limit the quantities of any products or services that we
          offer. All descriptions of products or product pricing are subject to
          change at any time without notice, at the sole discretion of us. We
          reserve the right to discontinue any product at any time. Any offer
          for any product or service made on this site is void where prohibited.
        </Text>
        <Text>
          We do not warrant that the quality of any products, services,
          information, or other material purchased or obtained by you will meet
          your expectations, or that any errors in the Service will be
          corrected.
        </Text>
        <Heading size="md">
          SECTION 6-ACCURACY OF BILLING AND ACCOUNT INFORMATION
        </Heading>
        <Text>
          We reserve the right to refuse any order you place with us. We may, in
          our sole discretion, limit or cancel quantities purchased per person,
          per household or per order. These restrictions may include orders
          placed by or under the same customer account, the same credit card,
          and/or orders that use the same billing and/or shipping address. In
          the event that we make a change to or cancel an order, we may attempt
          to notify you by contacting the e-mail and/or billing address/phone
          number provided at the time the order was made. We reserve the right
          to limit or prohibit orders that, in our sole judgment, appear to be
          placed by dealers, resellers or distributors.
        </Text>
        <Text>
          You agree to provide current, complete and accurate purchase and
          account information for all purchases made at our store. You agree to
          promptly update your account and other information, including your
          email address and credit card numbers and expiration dates, so that we
          can complete your transactions and contact you as needed.
        </Text>
        <Text>
          For more detail, please review our{" "}
          <Link
            className="font-weight-bold font-italic"
            onClick={executeScroll}
          >
            Returns and Exchange Policy
          </Link>
          .
        </Text>
        <Heading size="md">SECTION 7-OPTIONAL TOOLS</Heading>
        <Text>
          We may provide you with access to third-party tools over which we
          neither monitor nor have any control nor input.
        </Text>
        <Text>
          You acknowledge and agree that we provide access to such tools ”as is”
          and “as available” without any warranties, representations or
          conditions of any kind and without any endorsement. We shall have no
          liability whatsoever arising from or relating to your use of optional
          third-party tools.
        </Text>
        <Text>
          Any use by you of optional tools offered through the site is entirely
          at your own risk and discretion and you should ensure that you are
          familiar with and approve of the terms on which tools are provided by
          the relevant third-party provider(s).
        </Text>
        <Text>
          We may also, in the future, offer new services and/or features through
          the website (including, the release of new tools and resources). Such
          new features and/or services shall also be subject to these Terms of
          Service.
        </Text>
        <Heading size="md">SECTION 8-THIRD-PARTY LINKS</Heading>
        <Text>
          Certain content, products and services available via our Service may
          include materials from third-parties.
        </Text>
        <Text>
          Third-party links on this site may direct you to third-party websites
          that are not affiliated with us. We are not responsible for examining
          or evaluating the content or accuracy and we do not warrant and will
          not have any liability or responsibility for any third-party materials
          or websites, or for any other materials, products, or services of
          third-parties.
        </Text>
        <Text>
          We are not liable for any harm or damages related to the purchase or
          use of goods, services, resources, content, or any other transactions
          made in connection with any third-party websites. Please review
          carefully the third-party's policies and practices and make sure you
          understand them before you engage in any transaction. Complaints,
          claims, concerns, or questions regarding third-party products should
          be directed to the third-party.
        </Text>
        <Heading size="md">SECTION 9-PERSONAL INFORMATION</Heading>
        <Text>
          Your submission of personal information through the store is governed
          by our Privacy Policy. We would want our guests to feel secure when
          shopping with us. We are committed to keeping your information secure.
        </Text>
        <Heading size="md">SECTION 10-PRIVACY POLICY</Heading>
        <Heading size="sm">Data Profiling: </Heading>
        <Text>
          We collect personally identifiable information (email address, name,
          phone number, etc.) from you when you sign up to use the website. The
          information provided by you may be used by us or shared by us with our
          corporate affiliates, dealers, agents, vendors and other third parties
          to help process your request; to comply with any law, regulation,
          audit or court order; to help improve our website or the products or
          services we offer; for research; to better understand our Guests'
          needs; to develop new offerings; and to alert you to new products and
          services (of us or our business associates) in which you may be
          interested. Your personal information is utilized to fulfill the
          services you request. In case your information is utilized towards any
          marketing initiatives derived by Kamsin Collection, we will provide
          you the ability to opt-out of such uses. We collect and analyze
          demographic and profile data about our user activity on our website in
          order to provide you best of the class services and offers. We
          identify and use your IP address to help diagnose problems with our
          server, and to administer our website.
        </Text>
        <Heading size="sm">Cookies: </Heading>
        <Text>
          {" "}
          These are small files of information which save and retrieve
          information about your visit to KAMSIN COLLECTIONS e.g. your IP
          address, how you entered & navigated this website what pages were of
          interest to you etc. (please note that if you are uncomfortable with
          the use of cookies, they can be disabled on your computer by changing
          the preferences or options menu in the browser settings).
        </Text>
        <Heading size="sm">My Store and Payment Information:: </Heading>
        <Text>
          Guests account history/information including (without limitation) all
          billing information and communications, payment history etc are
          maintained in an encrypted format on secure servers. Please note
          KAMSIN COLLECTIONS does not store your card or online bank account
          information.
        </Text>
        <Heading size="sm">Safety Measures: </Heading>
        <Text>
          Our website abides by strict security instructions in order to protect
          your personal information against unauthorized access like theft,
          misuse and alteration. We offer use of secure servers in order to
          preserve guests' personal data.
        </Text>
        <Heading size="sm">Linking Sites: </Heading>
        <Text>
          KAMSIN COLLECTIONS is not responsible for privacy practices or content
          posted on linking websites. We highly recommend our guests to go
          through the respective privacy policies before providing any personal
          information.
        </Text>
        <Heading
          size="md"
          style={{ fontWeight: "bolder", textDecoration: "underline" }}
        >
          {" "}
          NOTE:{" "}
        </Heading>
        <Text>
          Our privacy policy is subject to change at any time without notice. To
          make sure you are aware of any changes, please review this policy
          periodically. Feel free to get in touch with our team at{" "}
          <a
            style={{ textDecoration: "underline" }}
            href="mailto:kamsincollection.in"
          >
            kamsincollection.in
          </a>{" "}
          for any queries related to the Privacy Statement.
        </Text>
        <Heading size="md">SECTION 11-PAYMENT TERMS</Heading>
        <Text>
          Kamsin Collections offers a diverse range of payment options that are
          flexible and customer friendly to ensure a seamless checkout
          experience for you. You can choose from any of the below payment modes
          or combine a few to make your purchase:
        </Text>
        <ol>
          <li>Online Payment</li>
          <li>Cash on Delivery (COD)</li>
        </ol>
        <ol>
          <Heading size="sm">
            <li>Online Payment Modes:</li>
          </Heading>
          <ul>
            <li>UPI</li>
            <li>Debit Cards</li>
            <li>Netbanking</li>
            <li>Other Payment Gateways likeGPay, Phonepe, paytm, etc</li>
          </ul>
          <Heading size="sm">
            <li>Cash on Delivery Mode (COD)</li>
          </Heading>
          <Text>
            <strong>COD charges of INR 40/- shall be applicable.</strong>
          </Text>
          <ul>
            <li>
              Orders below INR 499/- : Delivery Charges INR 50/- per order shall
              be applicable.
            </li>
            <li>Orders above INR 499/- : Free Delivery.</li>
          </ul>
          <Text>
            The delivery address provided should be under the serviceable
            network of our courier partner. (Kindly provide an accurate address
            and pin code) Only pay cash to the delivery person (DD/Cheque will
            not be accepted) Amount of Invoice is inclusive of all taxes and
            charges; you are requested to pay the amount mentioned in the
            invoice.
          </Text>
        </ol>
        <Heading size="md">Please Note-</Heading>
        <Text>
          In case of online payment via Debit Cards, We as a merchant shall be
          under no liability whatsoever in respect of any loss or damage arising
          directly or indirectly out of the decline of authorization for any
          Transaction, on Account of the Cardholder having exceeded the preset
          limit mutually agreed by us with our acquiring bank from time to time.
          Your use of Kamsin Collections and any dispute arising out of such use
          of the website is subject to the laws of India. We strive to provide
          our guests a great yet transparent shopping experience!
        </Text>
        <Heading size="md" ref={myRef}>
          SECTION 12-RETURNS AND EXCHANGES POLICY
        </Heading>
        <Heading size="sm">
          Exchange Policy (Applicable for customers located anywhere but
          Varanasi)
        </Heading>
        <Text>Goods can be exchanged for another good only if:</Text>
        <ul style={{ listStyleType: "square" }}>
          <li>There is some defect or damage in the item purchased.</li>
          <li>There is some issue regarding the size of the item purchased.</li>
        </ul>
        <Text>
          In order for the goods to be eligible for exchange, please make sure
          that:
        </Text>
        <ul style={{ listStyleType: "square" }}>
          <li>The goods were purchased in the last 7 days.</li>
          <li>
            The item must be unused and in the same condition that you received
            it. It must also be in the original packaging.
          </li>
        </ul>
        <Text>
          There are certain situations where only partial refunds are granted:
          (if applicable)
        </Text>
        <ul style={{ listStyleType: "square" }}>
          <li>
            Any item not in its original condition, is damaged or missing parts
            for reasons not due to our error.
          </li>
        </ul>
        <Text>The following goods cannot be returned for an exchange:</Text>
        <ul style={{ listStyleType: "square" }}>
          <li>
            Only regular priced items may be refunded, unfortunately sale items
            cannot be refunded.
          </li>
        </ul>
        <Heading
          size="md"
          style={{ fontWeight: "bolder", textDecoration: "underline" }}
        >
          {" "}
          NOTE:{" "}
        </Heading>
        <Text>
          {" "}
          Our policy lasts 7 days. If 7 days have gone by since you have
          received your delivery, unfortunately we can't offer you an exchange.
        </Text>
        <Heading size="sm">Steps to take while exchanging the product:</Heading>
        <Text>
          In order to exercise your right of exchange, you must inform us of
          your decision by means of a clear statement. Kindly adopt any of the
          following two methods to inform us regarding the same:{" "}
        </Text>
        <ul>
          <li>
            Fill out the Queries Form under the support section along with the
            order number provided.
            <br></br>
            <b>NOTE:</b> You can find our Support Section on the bottom right
            corner of the home page.
          </li>
          <li>
            WhatsApp Us at-{" "}
            <a href="https://api.whatsapp.com/send/?phone=%2B918882303716&text&app_absent=0">
              +918882303716
            </a>
          </li>
        </ul>
        <Text>
          Once we receive your message for exchange, we will ask you certain
          questions, after which we will ask you to ship your item that is to be
          exchanged to us. You are responsible for the cost and risk of
          returning the goods to us.
        </Text>
        <Text>
          Once your return is received and inspected, we will send you an email
          to notify you that we have received the item to be exchanged. We will
          also notify you of the approval or rejection of your exchange through
          a mail or through our whatsapp business account.
        </Text>
        <Text>
          If your item/items is/are approved, then your exchange will be
          processed, and another product of your choice(In case, an alternate
          piece/size of the same item is not available, a different piece of the
          same price can be purchased in place of that item) will be delivered
          to you within 10 days from the date of approval of the item that is to
          be exchanged. Depending on where you live, the time it may take for
          your exchanged product to reach you, may vary.
        </Text>
        <Text>
          If your item/items is/are rejected (due to it not being in its
          original condition, or is used; or the item is damaged or is missing
          parts for reasons not due to our error) then your exchange will not be
          processed. In that case, we will provide you a partial refund only.
        </Text>
        <Heading
          size="md"
          style={{ fontWeight: "bolder", textDecoration: "underline" }}
        >
          {" "}
          NOTE:{" "}
        </Heading>
        <Text>
          Products can be exchanged once only. Second time exchange is not
          permitted. You are responsible for the cost and risk of returning the
          goods to us. You should send the goods to the following address:
          Kamsin Collection, Shop No. 9A, Gurudwara gate, Gurubagh, Varanasi,
          UP-221010
        </Text>
        <Text>
          We cannot be held responsible for goods damaged or lost in return
          shipment. You will be responsible for paying for your own shipping
          costs for returning your item. Shipping costs are non-refundable. We
          don't guarantee that we will receive your returned item. Therefore, we
          recommend an insured and trackable mail service. We are unable to
          issue an exchange without actual receipt of the goods or proof of
          received return delivery.
        </Text>
        <Heading size="sm">Exchange Policy</Heading>
        <Text>
          If the customer wants to exchange the product, he/she has to adopt any
          of the following two methods to return the product first -
        </Text>
        <ul style={{ listStyleType: "square" }}>
          <li>
            Courier the product at our shop (Address: Kamsin Collection, Shop
            No. 9A, Gurudwara gate, Gurubagh, Varanasi, UP-221010) and we will
            deliver different piece of the same product to you as soon as
            possible, which will be conveyed to you accordingly.
          </li>
          <li>
            Visit the shop (Address: Kamsin Collection, Shop No. 9A, Gurudwara
            gate, Gurubagh, Varanasi, UP-221010) and get the particular product
            exchanged for a different piece of the same product from the shop.
          </li>
        </ul>
        <Heading size="sm">Contact Us</Heading>
        <Text>
          If you have any questions about our ExchangePolicy, please contact us
          by e-mail :{" "}
          <a href="mailto:kamsincollection.in">kamsincollection.in</a>{" "}
        </Text>
        <Heading size="md" style={{ textDecoration: "underline" }}>
          Returns Policy
        </Heading>
        <Text>
          Products once sold are not returnable for whatsoever reasons. It can
          only be exchanged. Read our Exchange policy for the same.
        </Text>
        <Heading size="md" style={{ textDecoration: "underline" }}>
          Cancellation Policy
        </Heading>
        <ul>
          <li>
            You are entitled to cancel your order within 12 hours of placing the
            order, without giving any reason for doing so.
          </li>
          <li>
            In order to exercise your right of cancellation, you must inform us
            of your decision by tapping on the cancel button in MY ORDERS
            section of your profile page.
          </li>
        </ul>
        <Text>
          We will reimburse you no later than 72 hours or 3 Days from the date
          of cancellation. We will use the same means of payment as you used for
          the order, and you will not incur any fees for such reimbursement.
        </Text>
        <Heading size="md">SECTION 13-DELIVERY TERMS</Heading>
        <Heading size="sm">Delivery Charges: </Heading>
        <Text>
          Free Home Delivery- What a wonderful idea! It makes life so easy. You
          call, you order and you get what you want in a certain time limit. The
          world suddenly becomes an awesome place. Kamsin Collections
          understands all your needs and emotions well. Hence, we offer you free
          shipping, wherever you live. However, additional charges will be
          applicable under following circumstances:
        </Text>
        <Text>For Prepaid orders</Text>
        <ul>
          <li>
            Orders below INR 1099/- : Shipping Charges per order shall be
            applicable as per the location of the customer.
          </li>
          <li>Orders above INR 1099/- : Free Shipping.</li>
        </ul>
        <Text>For COD Orders</Text>
        <ul>
          <li>
            Cash on Delivery (COD)
            <ul style={{ listStyleType: "square" }}>
              <li>
                Orders below INR 1099/- : COD of INR 40 plus Shipping Charges as
                per the location of the customer shall be applicable.
              </li>
              <li>
                Orders above INR 1099/- : Only COD charges of INR 40/- shall be
                applicable.
              </li>
            </ul>
          </li>
          <li>
            Prepaid-
            <ul style={{ listStyleType: "square" }}>
              <li>
                Orders below INR 499/- : Delivery Charges INR 50/- per order
                shall be applicable.
              </li>
              <li>Orders above INR 499/- : Free Delivery.</li>
            </ul>
          </li>
        </ul>
        <Heading size="sm">Delivery Timeframe: </Heading>
        <Text>
          To all our customer's inner soul's delight, we offer a 10-day delivery
          guarantee! We do everything we can to ensure your experience at Kamsin
          Collections. It makes your life just a little easier, and your
          satisfaction is important to us. In rare cases there may be a slight
          delay in transit due to events beyond control of our logistic
          partners. You will be informed of revised Delivery Timelines in such
          cases. Depending on where you live, the time it may take for your
          exchanged product to reach you, may vary.
          <br></br>
          Disclaimer:10 days exclude special days (National Holidays, Natural
          Calamities and other emergency situations);
          <br></br>
          Delivery guarantee means 1st attempt of delivery will be made within
          7days; Delivery timeframe may vary during promotional campaigns, for
          which we will always keep you proactively informed.
        </Text>
        <Heading size="sm">Delivery Mode: </Heading>
        <Text>
          Wherever you live, Kamsin Collections has a variety of logistics
          partners across the city for delivering the products to your doorstep.
          We take ultimate responsibility for your delivery. Never letting our
          loyal customers down, we always encourage them to follow up directly
          with us for any delivery related queries.
          <br></br>
          Your use of Kamsin Collections and any dispute arising out of such use
          of the website is subject to the laws of India.
        </Text>
        <Heading size="md">
          SECTION 14-ERRORS, INACCURACIES AND OMISSIONS
        </Heading>
        <Text>
          Occasionally there may be information on our site or in the Service
          that contains typographical errors, inaccuracies or omissions that may
          relate to product descriptions, pricing, promotions, offers, product
          shipping charges, transit times and availability. We reserve the right
          to correct any errors, inaccuracies or omissions, and to change or
          update information or cancel orders if any information in the Service
          or on any related website is inaccurate at any time without prior
          notice (including after you have submitted your order).
        </Text>
        <Text>
          We undertake no obligation to update, amend or clarify information in
          the Service or on any related website, including without limitation,
          pricing information, except as required by law. No specified update or
          refresh date applied in the Service or on any related website, should
          be taken to indicate that all information in the Service or on any
          related website has been modified or updated.
        </Text>
        <Heading size="md">SECTION 15-PROBIHITED USES</Heading>
        <Text>
          In addition to other prohibitions as set forth in the Terms of
          Service, you are prohibited from using the site or its content:
        </Text>
        <ol type="a">
          <li> for any unlawful purpose; </li>
          <li>
            to solicit others to perform or participate in any unlawful acts ;
          </li>
          <li>
            {" "}
            to violate any international, federal, provincial or state
            regulations, rules, laws, or local ordinances;
          </li>
          <li>
            {" "}
            to infringe upon or violate our intellectual property rights or the
            intellectual property rights of others;{" "}
          </li>
          <li>
            to harass, abuse, insult, harm, defame, slander, disparage,
            intimidate, or discriminate based on gender, sexual orientation,
            religion, ethnicity, race, age, national origin, or disability;
          </li>
          <li>to submit false or misleading information;</li>
          <li>
            to upload or transmit viruses or any other type of malicious code
            that will or may be used in any way that will affect the
            functionality or operation of the Service or of any related website,
            other websites, or the Internet;{" "}
          </li>
          <li>to collect or track the personal information of others;</li>
          <li>to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
          <li> for any obscene or immoral purpose; or </li>
          <li>
            {" "}
            to interfere with or circumvent the security features of the Service
            or any related website, other websites, or the Internet. We reserve
            the right to terminate your use of the Service or any related
            website for violating any of the prohibited uses.
          </li>
        </ol>
        <Heading size="md">
          SECTION 16- DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
        </Heading>
        <Text>
          We do not guarantee, represent or warrant that your use of our service
          will be uninterrupted, timely, secure or error-free.
        </Text>
        <Text>
          We do not warrant that the results that may be obtained from the use
          of the service will be accurate or reliable.
        </Text>
        <Text>
          You agree that from time to time we may remove the service for
          indefinite periods of time or cancel the service at any time, without
          notice to you.
        </Text>
        <Text>
          You expressly agree that your use of, or inability to use, the service
          is at your sole risk. The service and all products and services
          delivered to you through the service are (except as expressly stated
          by us) provided 'as is' and 'as available' for your use, without any
          representation, warranties or conditions of any kind, either express
          or implied, including all implied warranties or conditions of
          merchantability, merchantable quality, fitness for a particular
          purpose, durability, title, and non-infringement.
        </Text>
        <Text>
          In no case shall Kamsin Collections, our directors, officers,
          employees, affiliates, agents, contractors, interns, suppliers,
          service providers or licensors be liable for any injury, loss, claim,
          or any direct, indirect, incidental, punitive, special, or
          consequential damages of any kind, including, without limitation lost
          profits, lost revenue, lost savings, loss of data, replacement costs,
          or any similar damages, whether based in contract, tort (including
          negligence), strict liability or otherwise, arising from your use of
          any of the service or any products procured using the service, or for
          any other claim related in any way to your use of the service or any
          product, including, but not limited to, any errors or omissions in any
          content, or any loss or damage of any kind incurred as a result of the
          use of the service or any content (or product) posted, transmitted, or
          otherwise made available via the service, even if advised of their
          possibility. Because some states or jurisdictions do not allow the
          exclusion or the limitation of liability for consequential or
          incidental damages, in such states or jurisdictions, our liability
          shall be limited to the maximum extent permitted by law.
        </Text>
        <Heading size="md">SECTION 17- INDEMNIFICATION</Heading>
        <Text>
          You agree to indemnify, defend and hold harmless and our parent,
          subsidiaries, affiliates, partners, officers, directors, agents,
          contractors, licensors, service providers, subcontractors, suppliers,
          interns and employees, harmless from any claim or demand, including
          reasonable attorneys' fees, made by any third-party due to or arising
          out of your breach of these Terms of Service or the documents they
          incorporate by reference, or your violation of any law or the rights
          of a third-party.
        </Text>
        <Heading size="md">SECTION 18- SEVERABILITY</Heading>
        <Text>
          In the event that any provision of these Terms of Service is
          determined to be unlawful, void or unenforceable, such provision shall
          nonetheless be enforceable to the fullest extent permitted by
          applicable law, and the unenforceable portion shall be deemed to be
          severed from these Terms of Service, such determination shall not
          affect the validity and enforceability of any other remaining
          provisions.
        </Text>
        <Heading size="md">SECTION 19- TERMINATION</Heading>
        <Text>
          The obligations and liabilities of the parties incurred prior to the
          termination date shall survive the termination of this agreement for
          all purposes.
        </Text>
        <Text>
          These Terms of Service are effective unless and until terminated by
          either you or us. You may terminate these Terms of Service at any time
          by notifying us that you no longer wish to use our Services, or when
          you cease using our site.
        </Text>
        <Text>
          If in our sole judgment you fail, or we suspect that you have failed,
          to comply with any term or provision of these Terms of Service, we
          also may terminate this agreement at any time without notice and you
          will remain liable for all amounts due up to and including the date of
          termination; and/or accordingly may deny you access to our Services
          (or any part thereof).
        </Text>
        <Heading size="md">SECTION 20- ENTIRE AGREEMENT</Heading>
        <Text>
          The failure of us to exercise or enforce any right or provision of
          these Terms of Service shall not constitute a waiver of such right or
          provision.
        </Text>
        <Text>
          These Terms of Service and any policies or operating rules posted by
          us on this site or in respect to The Service constitutes the entire
          agreement and understanding between you and us and govern your use of
          the Service, superseding any prior or contemporaneous agreements,
          communications and proposals, whether oral or written, between you and
          us (including, but not limited to, any prior versions of the Terms of
          Service).
        </Text>
        <Text>
          Any ambiguities in the interpretation of these Terms of Service shall
          not be construed against the drafting party.
        </Text>
        <Heading size="md">SECTION 21- GOVERNING LAW</Heading>
        <Text>
          These Terms of Service and any separate agreements whereby we provide
          you Services shall be governed by and construed in accordance with the
          laws of India and jurisdiction of Varanasi, Uttar Pradesh.
        </Text>
        <Heading size="md">SECTION 22- CHANGES TO TERMS OF SERVICE</Heading>
        <Text>
          You can review the most current version of the Terms of Service at any
          time at this page.
        </Text>
        <Text>
          We reserve the right, at our sole discretion, to update, change or
          replace any part of these Terms of Service by posting updates and
          changes to our website. It is your responsibility to check our website
          periodically for changes. Your continued use of or access to our
          website or the Service following the posting of any changes to these
          Terms of Service constitutes acceptance of those changes.
        </Text>
        <Heading size="md">SECTION 23- CONTACT INFORMATION</Heading>
        <Text>
          Questions about the Terms of Service should be sent to us at{" "}
          <a
            style={{ textDecoration: "underline" }}
            href="mailto:kamsincollection.in"
          >
            kamsincollection.in
          </a>{" "}
        </Text>
        <Heading size="md">SECTION 24- SECURITY POLICY</Heading>
        <Text>
          At KAMSIN COLLECTIONS, we are committed to providing you a secure and
          personalized shopping experience. We urge our guests to go through the
          following details before making transactions online:
        </Text>
        <b style={{ fontWeight: "bolder", fontStyle: "italic" }}>ABOUT US: </b>
        <Text>
          Details about the company, the individuals you are initiating a
          business relationship with and how the company works - Read our
          profile under "About Us" section{" "}
        </Text>
        <b style={{ fontWeight: "bolder", fontStyle: "italic" }}>
          PRIVACY POLICY:{" "}
        </b>
        <Text>
          Check if the online store offers you a 'Privacy Policy', to ensure
          your personal data is secure from any third party. Check our Privacy
          Policy.
        </Text>
        <b style={{ fontWeight: "bolder", fontStyle: "italic" }}>
          SECURITY POLICY:{" "}
        </b>
        <Text>
          {" "}
          While making an online payment, Kamsin Collections takes care of your
          data security through encryption technology which helps prevent third
          party access to your details. DO NOT SHARE YOUR CARD OR BANKING
          DETAILS with anyone on phone or in person for security reasons.
        </Text>
        <b style={{ fontWeight: "bolder", fontStyle: "italic" }}>
          RETURNS AND EXCHANGE POLICY:{" "}
        </b>
        <Text>
          Please go through the terms and conditions of return and exchange in
          case the items received are faulty or defective. Check our "Returns
          and Exchange Policy".
        </Text>
        <b style={{ fontWeight: "bolder", fontStyle: "italic" }}>
          CONTACT US:{" "}
        </b>
        <Text>
          As a customer you must know how to reach 'us' in case you need any
          help - Visit our 'Contact Us' section.
        </Text>
        <Heading size="sm">Happy Shopping!</Heading>
      </Container>
    </motion.div>
  );
}

export default Terms;
