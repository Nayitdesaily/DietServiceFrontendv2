import axios from "axios";
import { useEffect, useState } from "react";
import mock from "../../../@fake-db/mock";
import ReactPlayer from "react-player";
import { Spinner } from "reactstrap";
import TabList from "@mui/lab/TabList/TabList";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { Tab } from "@mui/material";

export default function Entrenamiento() {
  mock.restore();

  const [videos, setVideos] = useState([]);
  const [videoPrincipal, setVideoPrincipal] = useState({});
  const [tags, setTags] = useState([]);
  const [tab, setTab] = useState("");

  useEffect(() => {
    async function getData() {
      await axios.get("http://localhost:8000/api/canal_videos").then((res) => setVideos(res.data.data));

      await axios.get("http://localhost:8000/api/canal_tags").then((res) => setTags(res.data.data));
    }
    getData();
  }, []);

  useEffect(() => {
    setTab(tags?.[0]?.titulo);
  }, [tags]);

  console.log(tags);

  return (
    <div>
      <h4>Entrenamiento</h4>

      {tags.length == 0 ? (
        <div>
          <Spinner>Loading...</Spinner>
        </div>
        ) : (
        <TabContext value={tab}>
          <TabList
            onChange={(e, newValue) => {
              setTab(newValue);
            }}
            aria-label="simple tabs example"
          >
            {tags.map((tag, index) => (
              <Tab value={tag.titulo} label={tag.titulo} key={index} />
            ))}
          </TabList>

          {tags.map((tag, index) => (
            <TabPanel value={tag.titulo} key={index}>
              <ul
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                {videos
                  .filter((video) => video?.canal_tags_id?.id == tag?.id)
                  .map((video, index) => (
                    <li key={index} style={{ listStyle: "none", cursor: "pointer" }}>
                      <div>
                        {video?.urlvideo != null ? <ReactPlayer url={video.urlvideo} controls width={"38rem"} /> : null}
                      </div>
                    </li>
                  ))}
              </ul>
            </TabPanel>
          ))}
        </TabContext>
      )}
    </div>
  );
}
