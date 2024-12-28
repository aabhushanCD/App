import React, { Children, createContext, useState } from "react";

export const AuthContext = createContext({ USER: "", setUser: () => {} });
