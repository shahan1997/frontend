export const getPriceFormatCodeToSymbol = (
  amount: number,
  currency?: string
): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // currency: currency || 'LKR',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatter.format(amount);
};

export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append("image", file); // Use 'image' as key (matches backend)

    const response = await fetch(
      "http://localhost:5000/api/products/upload-image", // Updated API endpoint
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log("Full response data:", responseData); // Log full response
      console.log("Uploaded image URL:", responseData.data.image); // Log single image URL

      return responseData.data.image; // Return only the image URL
    } else {
      throw new Error("Error uploading image");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
