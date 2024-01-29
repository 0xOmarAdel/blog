import Image from "next/image";
import mysql from "mysql";

export default function Home() {
  var connection = mysql.createConnection(process.env.MYSQL_URI!);

  connection.connect();

  connection.query(
    "SELECT * FROM article JOIN category ON article.category_id = category.id",
    (error, results) => {
      if (error) throw error;
      console.log(results[0]);
    }
  );

  connection.end();

  return (
    <div></div>
  );
}
