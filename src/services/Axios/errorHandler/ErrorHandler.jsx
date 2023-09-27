import axios from "axios";

const errorResponse = (error)=>{

    console.log('error',error);

    let textError=""

    if (axios.isAxiosError(error) && !error.response) {
      
        textError = ' عدم اتصال به اینترنت ';
        
    }else if(error.response.status === 403){
        textError="متاسفانه سقف درخواست های روزانه به پیان رسید "
    }

    return textError

}

export {errorResponse}