// GroupFlow.tsx
import { useEffect, useState } from "react";
import "../groups/groupflowPage.css";

const GroupFlow = ({ groupId }: { groupId: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contributors, setContributors] = useState<any[]>([]); // Use an array of objects for contributors

  useEffect(() => {
    const dummyContributors = [
      {
        id: 1,
        name: "OluwaSegun",
        pictureUrl: "/src/assets/groupPic1.svg",
        contributing: 100,
        withdrawing: 50,
        fees: 10,
        nextCashOut: "2023-10-01",
        recentCashOut: "2023-09-15",
        status: "online",
      },
      {
        id: 2,
        name: "Contributor 2",
        pictureUrl: "/src/assets/young-african-woman.png",
        contributing: 120,
        withdrawing: 60,
        fees: 15,
        nextCashOut: "2023-10-05",
        recentCashOut: "2023-09-20",
        status: "offline",
      },
      {
        id: 3,
        name: "Contributor 3",
        pictureUrl: "",
        contributing: 80,
        withdrawing: 40,
        fees: 8,
        nextCashOut: "2023-09-28",
        recentCashOut: "2023-09-10",
        status: "online",
      },
      {
        id: 4,
        name: "Contributor 4",
        pictureUrl: "",
        contributing: 150,
        withdrawing: 70,
        fees: 12,
        nextCashOut: "2023-10-03",
        recentCashOut: "2023-09-18",
        status: "offline",
      },
    ];
    setContributors(dummyContributors);
  }, [groupId]);

  return (
    <div className="group-flow-container">
      <div>
        <h1>Flow</h1>
        {/* <h2>Group ID: {groupId}</h2> */}
        <div className="contributors-container">
          {contributors.map((contributor) => (
            <div key={contributor.id} className="contributor-1">
              <div className="contributor-picture">
                <div className={`status-dot ${contributor.status}`} />
                <img
                  src={contributor.pictureUrl || `/src/assets/groupPic1.svg`}
                  // src={contributor.pictureUrl || ""}
                  alt={`Profile of ${contributor.name}`}
                />
              </div>
              <div></div>
              <div className="contributor-details">
                <div className="label-value-pair">
                  <div className="label">
                    <strong>Name:</strong>
                  </div>
                  <div className="value">{contributor.name}</div>
                </div>
                <div className="label-value-pair">
                  <div className="label">
                    <strong>Contributing:</strong>
                  </div>
                  <div className="value">{contributor.contributing}</div>
                </div>
                <div className="label-value-pair">
                  <div className="label">
                    <strong>Withdrawing:</strong>
                  </div>
                  <div className="value">{contributor.withdrawing}</div>
                </div>
                <div className="label-value-pair">
                  <div className="label">
                    <strong>Fees:</strong>
                  </div>
                  <div className="value">{contributor.fees}</div>
                </div>
                <div className="label-value-pair">
                  <div className="label">
                    <strong>Next Cash Out:</strong>
                  </div>
                  <div className="value">{contributor.nextCashOut}</div>
                </div>
                <div className="label-value-pair">
                  <div className="label">
                    <strong>Recent Cash Out:</strong>
                  </div>
                  <div className="value">{contributor.recentCashOut}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupFlow;
