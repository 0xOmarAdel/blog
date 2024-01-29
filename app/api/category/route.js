import mysql from "mysql";
import { fetchCategoriesQuery } from "@/db/index";

export const GET = async (request, { params }) => {
  try {
    var connection = mysql.createConnection(process.env.MYSQL_URI);

    connection.connect();

    const queryResult = await new Promise((resolve, reject) => {
      connection.query(fetchCategoriesQuery, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    connection.end();

    return new Response(JSON.stringify(queryResult), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
