import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
const Container = styled.div`
    ${mobile({ width: "100vw", padding: 0 })};
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Header = styled.h1`
    
`
const Wrapper = styled.div`
    ${mobile({ width: "90vw" })};
    padding: 15px;
    width: 60vw;
    height: auto;
    background-color: antiquewhite;
    font-size: 18px;
`
const Support = () => {
    return (
        <Container>
            <Header>
                Support
            </Header>
            <Wrapper>
                At <strong>Sev7n</strong>, we understand that receiving a damaged product can be disappointing, and we want to assure you that we are here to make things right. Your satisfaction is our top priority, and we've streamlined our returns process to ensure a hassle-free experience for you.

                If you've received a damaged product, please follow these simple steps to initiate a return:
                <p>
                    <strong>Snap a Photo:</strong>   Take clear pictures of the damaged item, including any visible damage to the packaging.
                </p>
                <p>
                    <strong>Email Us:</strong> Send an email to <strong>sev7n.in@gmail.com</strong> with the subject line "Damaged Product Return - [Your Order Number]." Attach the photos you took and provide a brief description of the damage.
                </p>
                <p>
                    <strong>Your Details:</strong> Include your full name, contact number, and the best time to reach you. This information will help us expedite the process.
                </p>
                <p>
                    Once we receive your email, our dedicated support team will review your case promptly and get back to you with further instructions. Rest assured, we will do our utmost to resolve the issue to your satisfaction.
                </p>
                <p>
                    We appreciate your understanding and cooperation as we work to make things right for you. If you have any additional questions or concerns, please don't hesitate to reach out to our customer support team at <strong>sev7n.in@gmail.com</strong>.
                </p>
                <p>
                    Thank you for choosing <strong>sev7n</strong>. We value your trust and look forward to serving you better.
                </p>
            </Wrapper>
        </Container>
    );
}

export default Support;
