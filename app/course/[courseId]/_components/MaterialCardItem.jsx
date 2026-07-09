"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle2, RefreshCcw, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

function MaterialCardItem({
  item,
  studyTypeContent,
  course,
  courseId,
  refreshData,
}) {
  const [loading, setLoading] = useState(false);

  const isReady =
    item.type === "notes"
      ? studyTypeContent?.[item.type]?.length > 0
      : studyTypeContent?.[item.type]?.status?.toLowerCase() === "ready";

  const isGenerating = studyTypeContent?.[item.type]?.status?.toLowerCase() === "generating";

  useEffect(() => {
    let timer;
    if (isGenerating) {
      timer = setTimeout(() => {
        refreshData(true);
      }, 3000); // Poll every 3 seconds while generating
    }
    return () => clearTimeout(timer);
  }, [isGenerating, refreshData]);

  const generateContent = async () => {
    toast("Generating content");
    setLoading(true);
    let chapters = " ";
    course?.courseLayout?.chapters?.forEach((chapter) => {
      chapters += (chapter?.chapter_title || chapter?.chapterTitle) + ", ";
    });

    try {
      const result = await axios.post("/api/study-type-content", {
        courseId,
        chapters,
        type: item.name,
      });

      setLoading(false);
      refreshData(true);
      toast("Content generated successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
      const errorMessage =
        error?.response?.data?.error ||
        "Failed to generate content. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className={`border p-5 flex flex-col items-center rounded-lg
     h-64 justify-between ${!isReady && "grayscale"}`}
    >
      {!isReady ? (
        <h2 className="rounded-full bg-zinc-800 text-[13px] p-1 px-2 text-primary flex items-center">
          Generate <Sparkles className="h-[13px]" />
        </h2>
      ) : (
        <h2 className="rounded-full bg-green-400 text-[13px] p-1 px-2 text-primary flex items-center">
          Ready <CheckCircle2 className="h-[13px]" />
        </h2>
      )}

      <Image src={item.icon} alt={item.name} height={50} width={50} />
      <h2 className="text-2xl">{item.name}</h2>
      <p className="text-sm text-center">{item.desc}</p>

      {/* Check if the material is ready for study or generate button */}
      {!isReady ? (
        <Button
          variant="outline"
          onClick={() => generateContent()}
          disabled={loading || isGenerating}
        >
          {isGenerating || loading ? "Generating" : "Generate"}
          {(loading || isGenerating) && <RefreshCcw className="animate-spin ml-2" />}
        </Button>
      ) : (
        <Link href={"/course/" + courseId + item.path}>
          <Button variant="outline">View</Button>
        </Link>
      )}
    </div>
  );
}

export default MaterialCardItem;
