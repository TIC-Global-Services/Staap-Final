import React from 'react'

const SmartLiving6 = () => {
  return (
    <div>

          <div className="absolute h-screen w-full">
            {project.ProjectAssets.length > 0 && project.ProjectAssets[5] ? (
              project.ProjectAssets[5].type === "video/mp4" ? (
                <video
                  className="w-full h-full object-contain rounded-md object-center"
                  src={project.ProjectAssets[5]}
                  muted
                  autoPlay
                  loop
                  playsInline
                />
              ) : (
                <img
                  className="w-full h-full object-cover  rounded-sm object-center"
                  src={project.ProjectAssets[5] || "/placeholder.svg"}
                  alt={project.name}
                />
              )
            ) : null}
          </div>
    </div>
  )
}

export default SmartLiving6