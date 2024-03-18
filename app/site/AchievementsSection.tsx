"use client";
import React from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const achievementsList = [
  {
    metric: "Properties",
    value: "280",
    postfix: " +",
  },
  {
    prefix: "",
    metric: "Satisfied Tenants",
    value: "213,000",
  },
  {
    metric: "Awards",
    value: "28",
  },
  {
    metric: "Years in service.",
    value: "39",
  },
];

const AchievementsSection:React.FC = () => {
  return (
    <div className="dark:text-white light:text-black py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0 dark:text-white light:text-black"
            >
              <h2 className="dark:text-white light:text-black text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbers
                   includeComma
                   animateToNumber={parseInt(achievement.value)}
                   locale="en-US"
                   className="dark:text-white light:text-black text-4xl font-bold"
                />
                {achievement.postfix}
              </h2>
              <p className="dark:text-white light:text-black text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;
