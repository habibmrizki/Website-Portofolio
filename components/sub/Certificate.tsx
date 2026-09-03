"use client";

import React, { useState } from "react";
import { Modal, IconButton, Box, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import Image from "next/image";

interface CertificateProps {
  ImgSertif: string;
  title?: string;
}

const Certificate: React.FC<CertificateProps> = ({ ImgSertif, title }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Certificate Thumbnail Card */}
      <div
        onClick={handleOpen}
        className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0d0f1d]/90 border border-slate-800/80 hover:border-purple-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] flex flex-col justify-between"
      >
        <div className="relative w-full h-full bg-[#070914] p-1.5 flex items-center justify-center">
          <Image
            src={ImgSertif}
            alt={title || "Certificate"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
          />

          {/* Hover / Touch Overlay */}
          <div className="absolute inset-0 bg-[#030014]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center z-10">
            <div className="p-2.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 mb-2 transform group-hover:scale-110 transition-transform">
              <FullscreenIcon sx={{ fontSize: 28 }} />
            </div>
            <span className="text-white text-xs sm:text-sm font-semibold line-clamp-2">
              {title || "View Certificate"}
            </span>
            <span className="text-[11px] text-purple-300/80 mt-1">
              Click to preview
            </span>
          </div>
        </div>
      </div>

      {/* Certificate Title below Card */}
      {title && (
        <p className="mt-2.5 text-xs sm:text-sm font-medium text-slate-300 text-center line-clamp-2 px-1 hover:text-purple-300 transition-colors">
          {title}
        </p>
      )}

      {/* Modal Lightbox */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(3, 0, 20, 0.9)",
            backdropFilter: "blur(10px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 1.5, sm: 3 },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "95vw",
            maxWidth: "950px",
            height: "82vh",
            outline: "none",
            borderRadius: "20px",
            overflow: "hidden",
            bgcolor: "#070914",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            boxShadow: "0 0 50px rgba(168, 85, 247, 0.2)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header Bar inside Modal */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d0f1d] border-b border-slate-800/80 z-20">
            <span className="text-sm font-semibold text-slate-200 truncate max-w-[80%]">
              {title || "Certificate Preview"}
            </span>

            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: "white",
                bgcolor: "rgba(255, 255, 255, 0.08)",
                "&:hover": {
                  bgcolor: "rgba(168, 85, 247, 0.8)",
                },
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </div>

          {/* Image Container inside Modal */}
          <div className="relative w-full flex-1 p-2 sm:p-4 bg-[#030014] flex items-center justify-center">
            <Image
              src={ImgSertif}
              alt={title || "Certificate Full View"}
              fill
              sizes="95vw"
              className="object-contain p-2"
              priority
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Certificate;
