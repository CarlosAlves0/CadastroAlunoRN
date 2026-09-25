"use strict";

function isEmpty(value) {
    if (value === null || value === undefined){
        return true;
    }

    if (typeof(value) === "string" || Array.isArray(value)){
        return value.trim ? value.trim().length === 0 : value.length === 0;
    }

    return false;
}

function isValidEmail(email){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function isValidNumber(value){
    if (value === undefined || value === null){
        return false;
    }

    const str = String(value).trim().replace(',', '.');
  
    const regexDecimal = /^[-+]?\d+(\.\d+)?$/;
    
    return regexDecimal.test(str);
}