import React from 'react';
import ReactDOM from 'react-dom';
import Project from '../Project.js';
import ProjectItem from '../ProjectItem.js';
import ModalEditProject from '../ModalEditProject.js';
import ModalEditProjectInput from '../ModalEditProjectInput.js';

it('Project renders without crashing', () => {
  const projects = [
    {"id":1,"name":"Vacances 2017","family":{"id":2,"name":"Team ACDO"}},
    {"id":2,"name":"Voiture principale","family":{"id":2,"name":"Team ACDO"}}
  ];
  const div = document.createElement('div');
  ReactDOM.render(<Project projects={projects} />, div);
});

it('ProjectItem renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProjectItem />, div);
});

it('ModalEditProject renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalEditProject />, div);
});

it('ModalEditProjectInput renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalEditProjectInput />, div);
});
