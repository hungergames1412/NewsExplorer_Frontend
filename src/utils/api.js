import {
  NEWS_API_KEY,
  NEWS_API_URL,
  NEWS_API_PROXY_URL,
} from "./constants";

const TOKEN_VALUE = "test-token-12345";
const USER_STORAGE_KEY = "stub_user";
const ARTICLES_STORAGE_KEY = "stub_saved_articles";

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

const getNewsApiUrl = () => {
  return import.meta.env.PROD ? NEWS_API_PROXY_URL : NEWS_API_URL;
};

const readStoredUser = () => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

const writeStoredUser = (user) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const readStoredArticles = () => {
  const storedArticles = localStorage.getItem(ARTICLES_STORAGE_KEY);
  return storedArticles ? JSON.parse(storedArticles) : [];
};

const writeStoredArticles = (articles) => {
  localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
};

function getUserArticles(token) {
  return new Promise((resolve, reject) => {
    if (token !== TOKEN_VALUE) {
      reject(new Error("Unauthorized"));
      return;
    }

    resolve(readStoredArticles());
  });
}

function saveArticle(article, token) {
  return new Promise((resolve, reject) => {
    if (token !== TOKEN_VALUE) {
      reject(new Error("Unauthorized"));
      return;
    }

    const savedArticles = readStoredArticles();
    const alreadySaved = savedArticles.find(
      (savedArticle) => savedArticle.link === article.link
    );

    if (alreadySaved) {
      resolve(alreadySaved);
      return;
    }

    const newArticle = {
      ...article,
      _id: `article-${Date.now()}`,
    };

    const updatedArticles = [newArticle, ...savedArticles];
    writeStoredArticles(updatedArticles);
    resolve(newArticle);
  });
}

function deleteArticle(articleId, token) {
  return new Promise((resolve, reject) => {
    if (token !== TOKEN_VALUE) {
      reject(new Error("Unauthorized"));
      return;
    }

    const savedArticles = readStoredArticles();
    const updatedArticles = savedArticles.filter(
      (article) => article._id !== articleId
    );

    writeStoredArticles(updatedArticles);
    resolve({ message: "Article deleted" });
  });
}

function signup(data) {
  return new Promise((resolve) => {
    const user = {
      _id: "123",
      name: data.name || "Sarah",
      email: data.email,
    };

    writeStoredUser(user);
    resolve(user);
  });
}

function signin(data) {
  return new Promise((resolve, reject) => {
    const storedUser = readStoredUser();

    if (!storedUser) {
      const fallbackUser = {
        _id: "123",
        name: "Sarah",
        email: data.email,
      };
      writeStoredUser(fallbackUser);
    }

    resolve({ token: TOKEN_VALUE });
  });
}

function checkToken(token) {
  return new Promise((resolve, reject) => {
    if (token !== TOKEN_VALUE) {
      reject(new Error("Invalid token"));
      return;
    }

    const storedUser = readStoredUser() || {
      _id: "123",
      name: "Sarah",
      email: "sarah@example.com",
    };

    writeStoredUser(storedUser);
    resolve(storedUser);
  });
}

export const fetchNews = async (query) => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const from = weekAgo.toISOString().split("T")[0];
  const to = today.toISOString().split("T")[0];

  const url =
    `${getNewsApiUrl()}?q=${encodeURIComponent(query)}` +
    `&from=${from}` +
    `&to=${to}` +
    `&pageSize=100` +
    `&apiKey=${NEWS_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(
      "Sorry, something went wrong during the request. Please try again later."
    );
  }

  const data = await res.json();
  return data.articles || [];
};

export {
  signin,
  signup,
  getUserArticles,
  saveArticle,
  deleteArticle,
  checkToken,
};
