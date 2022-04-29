from pytube import YouTube

url = 'https://youtu.be/jJv2spbHPfc'
# my_video = YouTube(url)

# print(my_video.title)
# # print(my_video.streams.all())

# print("*********************Video Title************************")
# #get Video Title
# print(my_video.title)

# print("********************Tumbnail Image***********************")
# #get Thumbnail Image
# print(my_video.thumbnail_url)

# print("********************Download video*************************")
# #get all the stream resolution for the 
# # for stream in my_video.streams:
# #     print(stream)

# #set stream resolution
# my_video = my_video.streams.get_highest_resolution()

# # print(my_video)

# #or
# # my_video = my_video.streams.first()

# #Download video
# my_video.download()
def DownloadVideo(url, path):
    
    yt = YouTube(url)
    
    # print(yt)
    stream = yt.streams.get_highest_resolution()

    # if path == "" or path == None:
    #     path = str(Path.home() / "Downloads")
    
    try:
        stream.download()
    except:
        print("Connection Error")
        return

DownloadVideo(url)