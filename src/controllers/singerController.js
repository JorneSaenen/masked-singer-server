import Singer from '../models/singerModel.js';
import { makeURL } from '../lib/helpers.js';

const getAllSingers = async (req, res) => {
  try {
    const singers = await Singer.find();
    const { participant } = req.query;
    if (participant) {
      const filteredSingers = singers.filter((singer) =>
        singer.participant.toLowerCase().includes(participant.toLowerCase())
      );
      const uniqueSinger = filteredSingers[0];
      uniqueSinger.image = makeURL(uniqueSinger.image);
      return res.status(200).json({
        status: 'success',
        data: uniqueSinger,
      });
    }

    const updatedSingers = singers.map((singer) => {
      singer.image = makeURL(singer.image);
      return singer;
    });

    res.status(200).json({
      status: 'success',
      count: updatedSingers.length,
      data: updatedSingers,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const getSingerById = async (req, res) => {
  try {
    const { id } = req.params;
    const singer = await Singer.findById(id);
    singer.image = makeURL(singer.image);
    res.status(200).json({
      status: 'success',
      data: singer,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const createSinger = async (req, res) => {
  try {
    const { name, place, participant, episodeCount, startedEpisode } = req.body;
    const { file } = req;
    const image = file.filename;
    const singer = await Singer.create({
      name,
      image,
      place,
      participant,
      episodeCount,
      startedEpisode,
    });
    singer.image = makeURL(singer.image);
    res.status(201).json({
      status: 'success',
      data: singer,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const updateSinger = async (req, res) => {
  try {
    const { id } = req.params;
    const singer = await Singer.findById(id);
    const { place, participant, episodeCount, startedEpisode } = req.body;
    const singerObject = {
      place,
      participant,
      episodeCount,
      startedEpisode,
      image: singer.image,
      name: singer.name,
      image: singer.image,
    };
    const updatedSinger = await Singer.findByIdAndUpdate(id, singerObject);
    updateSinger.image = makeURL(updateSinger.image);
    res.status(200).json({
      status: 'success',
      data: updatedSinger,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const deleteSinger = async (req, res) => {
  try {
    const { id } = req.params;
    const singer = await Singer.deleteOne({ _id: id });
    res.status(200).json({
      status: 'success',
      data: singer,
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    });
  }
};

export {
  getAllSingers,
  getSingerById,
  updateSinger,
  deleteSinger,
  createSinger,
};
