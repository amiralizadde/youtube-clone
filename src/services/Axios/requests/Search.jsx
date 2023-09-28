import apiRequests from "../configs/Configs.jsx";


const videoSearch = (searchValue) => {
    return apiRequests("/search", {
        params: {
            q: searchValue,
            part: "snippet",
            maxResults: 10, // تعداد نتایج مورد نظر را تنظیم کنید
            type: "video",
          },
    });
  };

  export {videoSearch}