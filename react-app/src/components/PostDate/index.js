import React from "react";


function PostDate ({ date }) {
    const parsedDate = new Date(date);
    const month = parsedDate.getMonth();
    const day = parsedDate.getDate();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
        <>{`${monthNames[month]}, ${day}`}</>
    )
};

export default PostDate;