import {withAuthenticator} from '@aws-amplify/ui-react'
import { useState } from 'react'
import { API, Storage } from 'aws-amplify'
import { createPark } from '../src/graphql/mutations'
import config from '../src/aws-exports'

let CreatePark = ()  =>{
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const handleSubmit = async (e) => { 
    e.preventDefault()
    // make sure image.name is a unique key
    const uploadImage = await Storage.put(image.name, image)
    const newPark = await API.graphql({
      query: createPark,
      variables: {
        input: {
          name: name,
          image: {
             region: config.aws_user_files_s3_bucket_region,
             bucket: config.aws_user_files_s3_bucket,
             key: uploadImage.key
          }
        }
      }
    })
    console.log(newPark)
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <h2>Create a park</h2>
      Name: <label htmlFor="name" />
      <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
      Image: <label htmlFor="image" />
      <input
        type="file"
        name="image"
        id="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <input type="submit" value="create" />
    </form>
  );
}

export default withAuthenticator(CreatePark);