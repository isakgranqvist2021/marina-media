import fetch from 'node-fetch';
import nodemailer from 'nodemailer';
import env from './env';

export function randStr(n = 10) {
    let runes = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890_!'.split('');
    let val = '';

    for (let i = 0; i < n; i++)
        val += runes[Math.floor(Math.random() * runes.length)];

    return val;
}

export async function sendEmail(to, message) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: env.GMAIL_EMAIL,
            pass: env.GMAIL_PW,
        },
    });

    let info = await transporter.sendMail({
        from: '<' + env.GMAIL_EMAIL + '>',
        to: to,
        subject: 'Verification Code',
        html: message
    });

    console.log(info);
}

export function getCode() {
    const runes = '0123456789';
    runes.split('');
    let val = '';

    for (let i = 0; i < 6; i++) {
        val += runes[Math.floor(Math.random() * runes.length)]
    }

    return val;
}

export async function getUserInfo() {
    const ipInfo = await fetch('http://ip-api.com/json/?fields=61439', {
        method: 'GET'
    });

    return await ipInfo.json();
}

export function isEmailValid(email) {
    if (email.length > 50) return false;

    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

export function isPhoneValid(phone) {
    if (phone.length > 15) return false;

    return /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/.test(phone);
}


export function validateEmail(body) {
    if (!body.email) {
        return { type: 'error', message: 'please enter your email' };
    }

    if (!isEmailValid(body.email)) {
        return { type: 'error', message: 'please enter a valid email' };
    }

    return { type: 'success' };
}

export function validatePhone(body) {
    if (!body.phone) {
        return { type: 'error', message: 'please enter your phone number' };
    }

    if (!isPhoneValid(body.phone)) {
        return { type: 'error', message: 'please enter a valid phone number' };
    }

    return { type: 'success' };
}


export function constructItem(data) {
    return {
        quantity: 1,
        price_data: {
            currency: 'usd',
            unit_amount: Math.round(data.price) * 100,
            product_data: {
                name: data.title,
                images: data.images
            }
        }
    }
}

export const wwwImage = 'https://res.cloudinary.com/isak-tech/image/upload/v1625666073/www-purchase.jpg';
