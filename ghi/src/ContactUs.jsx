import React from 'react';

function ContactUs() {
  return (
    <div className="row">
  <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
      <h1>Contact Us</h1>
      <form>
        <div className="form-floating mb-3">
          <input
            placeholder="First Name"
            required
            type="text"
            name="first_name"
            className="form-control"
          />
          <label htmlFor="first_name">First Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            placeholder="Last Name"
            required
            type="text"
            name="last_name"
            className="form-control"
          />
          <label htmlFor="last_name">Last Name</label>
        </div>

        <div className="form-floating mb-3">
          <input
            placeholder="Email"
            required
            type="email"
            name="email"
            className="form-control"
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            placeholder="Your message..."
            required
            name="message"
            className="form-control"
            rows="5"
          ></textarea>
          <label htmlFor="message">Message</label>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>
  );
}

export default ContactUs;
