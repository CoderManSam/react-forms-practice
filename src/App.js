import { useState } from "react";
import "./App.css";

export default function App() {
  
  //TODO: Add your state fields here
  const initialFormState = {
    name: "",
    address: "", 
    phone: "",
    email: "",
    complaint: "",
    contact: "",
    consent: false
  }

  const [userDetails, setUserDetails] = useState(initialFormState)

  const updateUserDetails = (event) => {
    event.preventDefault()

    const eventName = event.target.name
    const eventValue = event.target.value

    const newUserDetails = {...userDetails, [eventName]: eventValue}

    setUserDetails(newUserDetails)

    console.log("state name", eventName)

    console.log("state value ", eventValue)
  }

  const submitForm = (event) => {
    event.preventDefault()

    fetch(URL, {
      method: "POST",

      body: JSON.stringify(userDetails)
    })

    setUserDetails(initialFormState)
  }

  const displayState = () => {
    console.log("state is ", userDetails)
  }

  return (
    <>
      <form className="form" onSubmit={(submitForm, displayState)}>
        <h2>Complaining form!</h2>
        <div className="form__section-left">
          <label>
            Full name
            <input onChange={updateUserDetails} value={userDetails.name} type="text" name="name" required />
          </label>
          <label>
            Address
            <input onChange={updateUserDetails} value={userDetails.address} type="text" name="address" />
          </label>
          <label>
            Phone Number
            <input onChange={updateUserDetails} value={userDetails.phone} type="tel" name="phone" />
          </label>

          <label>
            Email
            <input onChange={updateUserDetails} value={userDetails.email} type="email" name="email" />
          </label>
        </div>

        <div className="form__section-right">
          <label>
            Write your complaint
            <textarea
              onChange={updateUserDetails} 
              value={userDetails.complaint}
              name="complaint"
              rows="10"
              placeholder="You can complain here"
            ></textarea>
          </label>
          {/* BUG HERE RADIO ISNT BEING TICKED AND IT IS WHEN CHECKBOX BELOW IS */}
          <div className="form__radio-group">
            <p>How do you want to be contacted? </p>
            <label>
              <input onChange={updateUserDetails} checked={userDetails.contact === "phone"} type="radio" name="contact" value="phone" />
              Phone
            </label>

            <label>
              <input onChange={updateUserDetails} checked={userDetails.contact === "email"} type="radio" name="contact" value="email" />
              Email
            </label>

            <label>
              <input onChange={updateUserDetails} checked={userDetails.contact === "post"} type="radio" name="contact" value="post" />
              Slow Mail
            </label>

            <label>
              <input onChange={updateUserDetails} checked={userDetails.contact === "none"} type="radio" name="contact" value="none" />
              No contact!
            </label>
          </div>

          <label>
            I agree you take my data, and do whatever
            <input onChange={updateUserDetails} checked={userDetails.consent} type="checkbox" name="consent" id="consent" value="checked" />
          </label>
        </div>
        <input type="submit" value="Submit!" />
      </form>
    </>
  );
}
