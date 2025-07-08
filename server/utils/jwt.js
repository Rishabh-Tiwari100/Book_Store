import jwt from "jsonwebtoken";

export const generateAccessToken = (id,role) => {
    return jwt.sign({ id, role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",


    });
};

export const generateRefreshToken = (id,role) => {
    return jwt.sign({ id, role }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};