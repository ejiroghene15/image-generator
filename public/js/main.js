const API_ENDPOINT = "http://localhost:5000/openai/generate-image";

gen_img.addEventListener("click", function () {
	generateImage();
});

async function generateImage() {
	let prompt = document.querySelector("#prompt").value;
	let size = document.querySelector("#size").value;
	if (!prompt) return alert("Text is required");

	try {
		loader.classList.add("active");

		const response = await fetch(API_ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt, size }),
		});

		loader.classList.remove("active");
		if (!response.ok) {
			loader.classList.remove("active");
			return toastr.error("", "Could not generate Image");
		}

		const data = await response.json();
		// console.log(data);

		if (data.status === true) {
			generated_img.setAttribute("src", data.imageUrl);
			display_image.classList.remove("d-none");
			loader.classList.remove("active");
		}
	} catch (error) {}
}
