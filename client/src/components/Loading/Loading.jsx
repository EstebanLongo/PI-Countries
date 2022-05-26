import React from "react";

export default function Loading({ setLoading }) {
  return (
    <div>
      <div>
        <img
          src="https://cdn.dribbble.com/users/940782/screenshots/3533101/plane-loader-slower.gif"
          alt="img not found"
        />
      </div>
      <div>
        {setTimeout(() => {
          setLoading(false);
        }, 5000)}
      </div>
    </div>
  );
}
