async function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const chatDiv = document.createElement('div');
  chatDiv.id = 'chatStylist';
  chatDiv.innerHTML = `<div class="card">
  <div id="header">
    <h1>Chat Bot</h1>
  </div>
  <div id="message-section">
    <div id="init" class="message bot">
      Hello I am your personal stylist, what kind of dress are you looking for today?
    </div>
  </div>
  <div id="input-section">
    <input id="input" type="text" placeholder="Type a message" autocomplete="off" autofocus="autofocus"/>
    <button class="send" onclick="sendMessage()" title="Send Message">
      <div class="circle">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
        </svg>
      </div>
    </button>
  </div>
</div>`
  document.body.appendChild(chatDiv)
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

async function output(input) {  
  const elements = document.getElementsByClassName("message");

  let msgs = [{
    role: 'system',
    content: `You are a helpful fashion stylist chatbot embedded on a fashion brand website.
    You are able to recommend its products from the catalogue based on customer needs and preferences.
    
    Use this catalogue products metadata to recommend products to the customer:
    <url>
    <loc>https://buzzzest.store/</loc>
    <desc>Buzzzest Brand store</desc>
    </url>
    <url>
    <loc>https://buzzzest.store/</loc>
    <desc>An overview about our book collection</desc>
    </url>
    <url>
    <loc>https://buzzzest.store/collections/men</loc>
    <content>
        <product>
        <url>https://buzzzest.store/products/denim-shirt</url>
        <desc>Discover the versatility and comfort of our Denim Shirt! Made with 100% cotton for a soft, breathable feel. The unique touch of coconut buttons adds a touch of natural charm. Elevate your wardrobe with this stylish and sustainable choice.</desc>
        <price>Rs 999</price>
        <availability>in stock</availability>
        <tags>denim,shirt,tshirt,blue</tags>
        </product>
        <product>
        <url>https://buzzzest.store/products/unisex-floral-blazer</url>
        <desc>Elevate your style with our Unisex Floral Blazer. Crafted from soft corduroy with a stunning floral print, this blazer is perfect for adding a touch of elegance to any outfit. Versatile and effortlessly chic, it's a must-have for fashion-forward individuals looking to make a statement.</desc>
        <price>Rs 5000</price>
        <availability>in stock</availability>
        <tags>unisex,floral,blazer,suit</tags>
        </product>
    </content>
    </url>
    <url>
    <loc>https://buzzzest.store/collections/co-ord</loc>
    <content>
        <product>
        <url>https://buzzzest.store/products/unisex-floral-blazer</url>
        <desc>Elevate your style with our Unisex Floral Blazer. Crafted from soft corduroy with a stunning floral print, this blazer is perfect for adding a touch of elegance to any outfit. Versatile and effortlessly chic, it's a must-have for fashion-forward individuals looking to make a statement.</desc>
        <price>Rs 5000</price>
        <availability>in stock</availability>
        <tags>unisex,floral,blazer,suit</tags>
        </product>
        <product>
        <url>https://buzzzest.store/products/rhinestone-denim-belt</url>
        <desc>Introducing our Rhinestone Denim Belt, the perfect accessory to elevate any outfit. Made with high-quality denim and adorned with sparkling rhinestones, it adds a touch of glamour and sophistication to your look. Perfect for any occasion, this belt is a must-have for any fashion-forward wardrobe.</desc>
        <price>Rs 999</price>
        <availability>in stock</availability>
        <tags>belt,rhinestone,women,accessories</tags>
        </book>
        <product>
        <url>https://buzzzest.store/products/floral-denim-co-ord</url>
        <desc>Expertly crafted for the fashion-forward individual, our Floral Denim Co-ord features intricate floral embroidery on high-quality denim. The perfect combination of style and comfort, this co-ord is a must-have for any wardrobe. Elevate your look with this unique and versatile piece.</desc>
        <price>Rs 2999</price>
        <availability>in stock</availability>
        <tags>co-ord,2 piece,denim,floral,women,wedding</tags>
        </product>
    </content>
    </url>
    <url>
    <loc>https://buzzzest.store/collections/bag</loc>
    <content>
        <product>
        <url>https://buzzzest.store/products/tote-bag</url>
        <desc>Expertly crafted from kora cloth, our Tote Bag is the perfect blend of style and sustainability. The durable material makes it ideal for daily use and the spacious design allows you to carry all your essentials with ease. Upgrade your fashion game with our Tote Bag and make a positive impact on the environment.</desc>
        <price>Rs 250</price>
        <availability>in stock</availability>
        <tags>bag,kora,handbag,accessories</tags>
        </product>
    </content>
    </url>
    
    Provide only one recommendation.
    Include link as a HTML <a> tag. Example: You can checkout <a href='https://example.com/product'>here</a>`
  }];
  for (let i = 0; i < elements.length; i++) {
    // console.log(elements[i])
    if (elements[i].id !== 'init') msgs.push({
        role: elements[i].classList.contains('user')? 'user': 'assistant',
        content: elements[i].textContent.trim()
      })
  }
  msgs.push({
    role: 'user',
    content: input
  })

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer haTATZCoZ9V2FkVfkpLx2HOOD7jmEDmwwzvyzTbMjCdwEABF'
    },
    body: JSON.stringify({
      messages: msgs,
      max_tokens: 1500,
      prompt_truncate_len: 1500,
      temperature: 0.3,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
      stop: null,
      response_format: {type: 'text'},
      stream: false,
      model: 'accounts/fireworks/models/llama-v2-7b-chat',
      context_length_exceeded_behavior: 'truncate',
      user: null
    })
  };
  // console.log(options.body)
  const resp = await fetch('https://api.fireworks.ai/inference/v1/chat/completions', options);
  const res = await resp.json();
  
  const product = res["choices"][0]["message"]["content"];
  // console.log(res)
  // const product = 'Test'
  addChat(input, product);
}

function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.classList.add("message");
  userDiv.classList.add("user");
  userDiv.innerHTML = input;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.classList.add("message");
  botDiv.classList.add("bot");
  botDiv.innerHTML = product;
  mainDiv.appendChild(botDiv);
  scroll.scrollTop = mainDiv.scrollHeight;
}
