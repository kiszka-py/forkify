import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long time! Timeout after ${s} seconds`)
      );
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]);
    const data = await response.json();

    if (!response.ok)
      throw new Error(`${response.message} (${response.status})}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
//     const data = await response.json();

//     if (!response.ok)
//       throw new Error(`${response.message} (${response.status})}`);
//     return data;
//   } catch (error) {
//     // console.error(`helpers`);
//     throw error;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPost = fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const response = await Promise.race([fetchPost, timeout(TIMEOUT_SECONDS)]);
//     const data = await response.json();

//     if (!response.ok)
//       throw new Error(`${response.message} (${response.status})}`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
