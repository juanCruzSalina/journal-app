export const fileUploader = async (file: File) => {
  if(!file) throw new Error("No file was found");
  const url = 'https://api.cloudinary.com/v1_1/dnmune6oc/upload'

  const formData = new FormData()
  formData.append('upload_preset', 'journal-app')
  formData.append('file', file)

  let imageURL = ''

  try {
    const resp = await fetch(url, {
      method: 'POST',
      body: formData
    })
    const cloudResp = await resp.json()
    imageURL = cloudResp.secure_url

  } catch (error) {
    console.log(error)
    throw new Error("Unable to upload image.");
  }

  return imageURL
}