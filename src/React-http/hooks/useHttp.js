const firebase_url = `${process.env.REACT_APP_TODO_FIREBASE_URL}`;
const useHttp = () => {
  const sendRequest = async (reqeustConfig, applyData) => {
    const response = await fetch(`${firebase_url}/todos.json`, {
      method: reqeustConfig.method ? reqeustConfig.method : "GET",
      headers: reqeustConfig.headers ? reqeustConfig.headers : {},
      body: reqeustConfig.body ? JSON.stringify(reqeustConfig.body) : null,
    });

    const data = await response.json();
    applyData(data);
  };

  return { sendRequest };
};

export default useHttp;
