import { customizedAxios } from "@/services/axios";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const textColors = ["red", "orange", "green", "blue"];
  const backgroundColors = [
    "rgb(255, 246, 245)",
    "rgb(255, 251, 242)",
    "rgb(242, 251, 250)",
    "rgb(243, 243, 253)",
  ];
  const FetchData = async () => {
    try {
      const response = await customizedAxios.get("/summary");
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.log("error fetch data");
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  const SummaryItem = ({
    icon,
    category,
    score,
    textColor,
    backgroundColor,
  }) => {
    return (
      <div className="summary-item" style={{ background: backgroundColor }}>
        <div className="summary-item-left">
          <img src={icon} alt="desc" />
          <div style={{ color: textColor, fontWeight: "bold" }}>{category}</div>
        </div>
        <div className="summary-item-right" style={{ display: "flex" }}>
          <div style={{ fontWeight: "bold", marginRight: "10px" }}>{score}</div>
          <div style={{ fontWeight: "bold", opacity: 0.5 }}>/ 100</div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>result component</title>
      </Head>
      <main className="container" role="main">
        <div className="card">
          <div className="result">
            <h3>Your Result</h3>
            <div className="result-circle">
              <p>76</p>
              <p>of 100</p>
            </div>
            <p className="great">Great</p>
            <p>
              You scored higher than 65% of the people who have taken these
              tests.
            </p>
          </div>
          <div className="summary">
            <h2>Summary</h2>
            {data?.map((item, index) => (
              <SummaryItem
                key={index}
                icon={item.icon}
                category={item.category}
                score={item.score}
                textColor={textColors[index % textColors.length]}
                backgroundColor={
                  backgroundColors[index % backgroundColors.length]
                }
              />
            ))}
            <button>Continue</button>
          </div>
        </div>
      </main>
    </>
  );
}
