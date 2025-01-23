import React from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [person, setPerson] = React.useState({});
  const [infoType, setInfoType] = React.useState("name");
  const [infoValue, setInfoValue] = React.useState("random person");

  async function getPerson() {
    const response = await fetch(url);
    const data = await response.json();
    const personAllData = data.results[0];

    const personInfo = {
      image: personAllData.picture.large,
      name: `${personAllData.name.first} ${personAllData.name.last}`,
      email: personAllData.email,
      age: personAllData.dob.age,
      street: `${personAllData.location.street.number} ${personAllData.location.street.name}`,
      phone: personAllData.phone,
    };

    setLoaded(true);
    setPerson(personInfo);
    setInfoType("name");
    setInfoValue(personInfo.name);
  }

  React.useEffect(() => {
    getPerson();
  }, []);

  function getInfo(e) {
    if (e.target.classList.contains("icon")) {
      const infoType = e.target.dataset.label;
      setInfoType(infoType);
      setInfoValue(person[infoType]);
    }
  }

  return (
    <main className="bg-gradient-to-r from-blue-300 to-purple-300 min-h-screen flex items-center justify-center text-gray-900">
      <div className="block bg-transparent">
        <div className="container mx-auto bg-white p-8 rounded-3xl shadow-xl relative flex flex-col items-center justify-center">
          {person.image && (
            <img
              src={person.image}
              alt="random person"
              className="w-36 h-36 rounded-full mb-6 mx-auto border-4 border-pink-400 shadow-lg"
            />
          )}
          <p className="text-xl text-pink-400 font-semibold mb-2">My {infoType} is</p>
          <p className="text-3xl text-gray-800 font-semibold mb-6">{infoValue}</p>

          {/* Icon Buttons */}
          <div className="flex gap-6 justify-center mb-8">
            <button
              className="icon p-3 text-pink-400 hover:text-pink-500 hover:scale-110 transition duration-300"
              data-label="name"
              onMouseOver={getInfo}
            >
              <FaUser />
            </button>
            <button
              className="icon p-3 text-pink-400 hover:text-pink-500 hover:scale-110 transition duration-300"
              data-label="email"
              onMouseOver={getInfo}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon p-3 text-pink-400 hover:text-pink-500 hover:scale-110 transition duration-300"
              data-label="age"
              onMouseOver={getInfo}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon p-3 text-pink-400 hover:text-pink-500 hover:scale-110 transition duration-300"
              data-label="street"
              onMouseOver={getInfo}
            >
              <FaMap />
            </button>
            <button
              className="icon p-3 text-pink-400 hover:text-pink-500 hover:scale-110 transition duration-300"
              data-label="phone"
              onMouseOver={getInfo}
            >
              <FaPhone />
            </button>
          </div>

          <button
            type="button"
            className="btn bg-pink-400 text-white py-3 px-6 rounded-full shadow-lg hover:bg-pink-500 hover:scale-105 transition duration-300"
            onClick={getPerson}
          >
            {loaded ? "Random User" : "Loading..."}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
