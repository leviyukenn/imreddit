// import { Reference } from "@apollo/client";
// import {
//   Box,
//   Button,
//   createStyles,
//   makeStyles,
//   Theme,
// } from "@material-ui/core";
// import { convertToRaw, EditorState } from "draft-js";
// import draftToHtml from "draftjs-to-html";
// import { useRouter } from "next/router";
// import React, { useCallback, useState } from "react";
// import {
//   RegularPostDetailFragment,
//   RegularPostDetailFragmentDoc,
//   useCreatePostMutation,
// } from "../../generated/graphql";
// import { useIsAuth } from "../../utils/hooks/useIsAuth";
// import CommentRichEditor from "./post-editor/CommentRichEditor";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     form: {
//       position: "relative",
//     },
//     commentButton: {
//       position: "absolute",
//       borderRadius: "9999px",
//       right: "20px",
//       bottom: "10px",
//       zIndex: 1000,
//     },
//   })
// );

// const CreateComment = ({ replyTo }: { replyTo: RegularPostDetailFragment }) => {
//   const [createPost, { error: createPostError }] = useCreatePostMutation({
//     update(cache, { data: createPostResponse }) {
//       cache.modify({
//         id: cache.identify(replyTo),
//         fields: {
//           children(existingPostRefs: Reference[]) {
//             const commentRef = cache.writeFragment({
//               fragment: RegularPostDetailFragmentDoc,
//               data: createPostResponse?.createPost,
//               fragmentName: "RegularPostDetail",
//             });

//             return [commentRef, ...existingPostRefs];
//           },
//         },
//       });
//     },
//   });
//   const [displayInnerError, setDisplayInnerError] = useState<boolean>(false);

//   const router = useRouter();
//   const { checkIsAuth } = useIsAuth();

//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const onCreatePost = useCallback(async () => {
//     try {
//       setIsSubmitting(true);
//       if (!checkIsAuth()) return;
//       const postDetail = draftToHtml(
//         convertToRaw(editorState.getCurrentContent())
//       );

//       const result = await createPost({
//         variables: { text: postDetail, parentId: replyTo.id },
//       });

//       if (createPostError || result.errors) {
//         setDisplayInnerError(true);
//         return;
//       }
//     } catch (err) {
//       alert(err);
//     } finally {
//       setEditorState(EditorState.createEmpty());
//       setIsSubmitting(false);
//     }
//   }, [
//     createPost,
//     setDisplayInnerError,
//     router,
//     editorState,
//     checkIsAuth,
//     replyTo,
//   ]);

//   const classes = useStyles();
//   return (
//     <Box className={classes.form}>
//       <CommentRichEditor {...{ editorState, setEditorState }} />
//       <Button
//         variant="contained"
//         color="primary"
//         size="small"
//         onClick={onCreatePost}
//         className={classes.commentButton}
//         disabled={isSubmitting || !editorState.getCurrentContent().hasText()}
//       >
//         Comment
//       </Button>
//     </Box>
//   );
// };
// export default CreateComment;
