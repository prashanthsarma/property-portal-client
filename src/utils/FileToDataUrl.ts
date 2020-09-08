export class FileToDataUrl {

  public static GetImageDataUrl = async (fileList: FileList) => {
    const imageDataUrls: string[] = []
    const imageDataUrlPromises: Promise<void>[] = [];

    const GetImageUrlInternal = async (img: File) => {
      const url = await FileToDataUrl.GetImageUrl(img);
      if (url != null) {
        imageDataUrls.push(url)
      }
    }

    for (let i = 0; i < fileList.length; i++) {
      const element = fileList[i];
      imageDataUrlPromises.push(GetImageUrlInternal(element));
    }

    await Promise.all(imageDataUrlPromises);
    return imageDataUrls;
  }


  private static GetImageUrl = async (imgFile: File) => {
    if (imgFile.type.indexOf("image") === -1) {
      console.log("File not supported");
      return null;
    }
    else if (imgFile.size > 5242880) {
      console.log("Image too big (max 10MB)")
      return null;
    }
    const imgUrl = await FileToDataUrl.ReadFileAsDataURL(imgFile);

    return imgUrl
  }

  private static ReadFileAsDataURL = async (inputFile: File) => {
    const temporaryFileReader = new FileReader();

    return new Promise<string>((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result as string);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

}


