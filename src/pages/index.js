import { customizedAxios } from "@/services/axios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await customizedAxios.get("/summary");
      const data = response.data;
      setData(data);
      console.log(data);
    } catch (error) {
      console.log("error fetch data");
    }
  };
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
          <img src={icon} />
          <div style={{ color: textColor, fontWeight: "bold" }}>{category}</div>
        </div>
        <div className="summary-item-right" style={{ display: "flex" }}>
          <div style={{ fontWeight: "bold", marginRight: "10px" }}>{score}</div>
          <div style={{ fontWeight: "bold", opacity: 0.5 }}>/ 100</div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  const textColors = ["red", "orange", "green", "blue"];
  const backgroundColors = [
    "rgb(255, 246, 245)",
    "rgb(255, 251, 242)",
    "rgb(242, 251, 250)",
    "rgb(243, 243, 253)",
  ];
  return (
    <>
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
