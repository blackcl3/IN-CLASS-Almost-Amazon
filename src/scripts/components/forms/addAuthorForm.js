import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const addAuthorForm = (obj = {}) => {
  clearDom();
  const domString = `
    <form id="${obj.firebaseKey ? `update-author--${obj.firebaseKey}` : 'submit-author'}" class="mb-4">
      <div class="form-group">
        <label for="image">First Name</label>
        <input type="text" class="form-control" id="first_name" value="${obj.first_name ? obj.first_name : ''}" placeholder="First Name" required>
      </div>
      <div class="form-group">
        <label for="image">Last Name</label>
        <input type="text" class="form-control" id="last_name" value="${obj.last_name ? obj.last_name : ''}" placeholder="Last Name" required>
      </div>
      <div class="form-group">
        <label for="title">Email</label>
        <input type="email" class="form-control" id="email" value="${obj.email ? obj.email : ''}" aria-describedby="Email" placeholder="Enter Email" required>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Submit Author</button>
    </form>`;

  renderToDOM('#form-container', domString);
};

export default addAuthorForm;
