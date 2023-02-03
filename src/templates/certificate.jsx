import React from 'react';
// import ReactCurvedText from 'react-curved-text';
import './style.css';

function certificate(props) {
  const { name, mother, father, dob, school, date } = props;
  return (
    <div className='outer-border bg-white box-border md:w-[45vw]'>
      <div className='inner-dotted-border'>
        <span className='certification-hin md:text-[40px]'>
          माध्यमिक शिक्षा परिषद्, उत्तर प्रदेश
        </span>
        <br />
        <span className='certification-eng md:text-[20px]'>
          Board of High School and Intermediate Education, UP
        </span>
        <img
          className='logo m-auto w-[50px] md:w-[70px]'
          src='https://sarkarinet.com/wp-content/uploads/2020/06/up-board.jpg'
          alt='logo'
        />
        <span className='certify'>हाईस्कूल परीक्षा - २०२३</span>
        <br />
        <span className='certify'>High School Examination - 2023</span>
        <br />
        <span className='certify'>
          प्रमाणपत्र-सह-अंकपत्र (CERTIFICATE-CUM-MARKS SHEET)
        </span>

        <table
          style={{
            fontSize: '9px',
            width: '90%',
            borderCollapse: 'collapse',
            color: '#951672',
            margin: 'auto',
            borderWidth: '1px',
            borderColor: '#951672',
            borderStyle: 'solid',
          }}>
          <tr
            style={{
              borderWidth: '1px',
              borderColor: '#951672',
              borderStyle: 'solid',
            }}>
            <th
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
              }}>
              अनुक्रमांक <br /> Roll No.
            </th>
            <th
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
              }}>
              जनपद/केंद्र/विद्यालय कोड <br /> Distt./Centre/School Code
            </th>
            <th
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
              }}>
              संस्थागत/व्यक्तिगत <br /> Regular / Private
            </th>
            <th
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
              }}>
              परीक्षा प्रवर्ग <br /> Exam. Type
            </th>
            <th
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
              }}>
              प्रमाणपत्र क्रमांक <br /> Certificate No.
            </th>
          </tr>
          <tr style={{ textAlign: 'center' }}>
            <td
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
                color: 'black',
                fontWeight: 'bold',
              }}>
              2045114
            </td>
            <td
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
                color: 'black',
              }}>
              55/22779/1595
            </td>
            <td
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
                color: 'black',
              }}>
              REGULAR
            </td>
            <td
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
                color: 'black',
              }}>
              FULL EXAM
            </td>
            <td
              style={{
                borderWidth: '1px',
                borderColor: '#951672',
                borderStyle: 'solid',
                color: 'black',
              }}>
              55072496
            </td>
          </tr>
        </table>
        <p className='certify-small'>
          प्रमाणित किया जाता है कि (This is to certify that)
        </p>
        <p className='certify-small'>
          परिषद के अभिलेखानुसर (according to the Board's record)-{' '}
          <span style={{ color: 'black', fontSize: '12px' }}>
            {name ? name : 'AAKASH'}
          </span>
        </p>
        <p className='certify-small'>
          आत्मज/आत्मजा श्रीमती (son/daughter of Mrs.)-{' '}
          <span style={{ color: 'black', fontSize: '12px' }}>
            {mother ? mother : 'SONIYA'}
          </span>
        </p>
        <p className='certify-small'>
          एवं श्री (and Mr.)-{' '}
          <span style={{ color: 'black', fontSize: '12px' }}>
            {father ? father : 'BALLE'}
          </span>
        </p>
        <p className='certify-small'>
          जिन्की जन्मतिथि (whose date of birth is)-{' '}
          <span style={{ color: 'black', fontSize: '12px' }}>
            {dob
              ? dob
              : '9th NOVEMBER NINETEEN HUNDRED NINETY NINE (09/11/1999)'}
          </span>
        </p>
        <p className='certify-small'>
          ने फ़रवरी/मार्च 2023 की हाईस्कूल परीक्षा विद्यालय/केंद्र (has passed
          High School Examination held in February/March 2023 from
          School/Centre)-{' '}
          <span style={{ color: 'black', fontSize: '12px' }}>
            {school ? school : 'M VACHASPATI I C SULEM SARAI LUCKNOW'}
          </span>
        </p>

        <table
          style={{
            fontSize: '9px',
            width: '100%',
            borderCollapse: 'collapse',
            color: '#951672',
            margin: 'auto',
            borderWidth: '1px',
            borderColor: '#951672',
            borderStyle: 'solid',
          }}>
          <tr
            style={{
              borderWidth: '1px',
              borderColor: '#951672',
              borderStyle: 'solid',
            }}>
            <th>
              विषय <br /> Subject
            </th>
            <th>
              अधिक्तम अंक <br /> Max. Marks
            </th>
            <th colSpan={2}>
              प्राप्तांक Obtained Marks
              <br /> सैदांतिक (Theory) प्रयोगात्मक (Practical)
            </th>
            <th>
              योग <br /> Total
            </th>
            <th>
              ग्रेड <br /> Grade
            </th>
            <th>
              परीक्षाफल <br /> Result
            </th>
          </tr>
          <tr style={{ color: 'black', fontWeight: 'bold' }}>
            <td style={{ textAlign: 'left' }}>HINDI</td>
            <td>100</td>
            <td>42</td>
            <td>30</td>
            <td>072</td>
            <td>B1</td>
          </tr>
          <tr style={{ color: 'black', fontWeight: 'bold' }}>
            <td style={{ textAlign: 'left' }}>ENGLISH</td>
            <td>100</td>
            <td>41</td>
            <td>30</td>
            <td>071</td>
            <td>B1</td>
          </tr>
          <tr style={{ color: 'black', fontWeight: 'bold' }}>
            <td style={{ textAlign: 'left' }}>MATHEMATICS</td>
            <td>100</td>
            <td>36</td>
            <td>30</td>
            <td>066</td>
            <td>B2</td>
            <td>PASSED</td>
          </tr>
          <tr style={{ color: 'black', fontWeight: 'bold' }}>
            <td style={{ textAlign: 'left' }}>SCIENCE</td>
            <td>100</td>
            <td>23</td>
            <td>30</td>
            <td>053</td>
            <td>C1</td>
          </tr>
          <tr style={{ color: 'black', fontWeight: 'bold' }}>
            <td style={{ textAlign: 'left' }}>SOCIAL SCIENCE</td>
            <td>100</td>
            <td>43</td>
            <td>30</td>
            <td>073</td>
            <td>B1</td>
          </tr>
          <tr style={{ color: 'black', fontWeight: 'bold' }}>
            <td style={{ textAlign: 'left' }}>COMPUTER</td>
            <td>100</td>
            <td>23</td>
            <td>30</td>
            <td>053</td>
            <td>C1</td>
          </tr>
        </table>

        <div className='footer'>
          <div className='date'>
            <span className='certify-small'>तिथि (Date)-</span>

            <span
              style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }}>
              {' '}
              {date ? date : '15th MAY 2023'}
            </span>
          </div>
          <div className='qr'>
            <img
              src='data:image/png;base64,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'
              alt='qr'
            />
          </div>
          <span className='sign'>सचिव (Secretary)</span>
        </div>
      </div>
    </div>
  );
}

export default certificate;
