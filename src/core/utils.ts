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

export const uploadImages = async (
  files: File[]
): Promise<{ url: string; isFeatured: boolean }[] | null> => {
  try {
    const formData = new FormData();

    // Append each file with the key 'images'
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await fetch(
      "http://localhost:5000/api/products/upload-images",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log("Full response data:", responseData); // Logs the full response object
      console.log("Images array:", responseData.data.images); // Logs the images array
      // Directly return the images array from the backend response
      return responseData.data.images;
    } else {
      throw new Error("Error uploading images");
    }
  } catch (error) {
    throw new Error("Error uploading images");
  }
};
