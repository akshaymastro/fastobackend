const AWS = require("aws-sdk");
const randomstring = require("randomstring");
const { S3_BUCKET_NAME, AWS_REGION, S3_BUCKET_URL, ACCESS_KEY, SECRET_KEY } =
  process.env;

AWS.config.region = AWS_REGION;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
});

const s3Upload = async (file, name, fileName) => {
  try {
    const { buffer, originalname, mimetype } = file;
    let name = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });

    const Key = originalname.replace(" ", "+");

    const s3Options = {
      Body: buffer,
      Key,
      Bucket: S3_BUCKET_NAME,
      ACL: "public-read",
      ContentType: mimetype,
      Metadata: {
        name,
      },
    };

    await s3.putObject(s3Options).promise();

    return {
      link: `${S3_BUCKET_URL}/${s3Options.Key}`,
      mediaName: name,
      mediaType: mimetype,
    };
  } catch (err) {
    return err;
  }
};

module.exports = {
  s3Upload,
};
