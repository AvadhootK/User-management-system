import pandas as pd

df = pd.read_csv(r'D:\\Internship\\Webservices\\nodejs-service\\datasets\\Company-data.csv')
df.to_json(r"D:\\Internship\\Webservices\\nodejs-service\\datasets\\company-data.json")