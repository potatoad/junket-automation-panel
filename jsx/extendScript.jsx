app.enableQE()

function importSkin(n) {
    // alert('');
    var folderExists = false;
    var skinNames = ['01_SOLO', '02_DUO', '03_TRIO', '04_QUAD'];
    var skinBin;
    var skinBinName = '##_' + skinNames[n - 1] + '_SKIN';
    var skinFile = [];

    if (n >= 1 && n <= 4) {

        for (i = 0; i < app.project.rootItem.children.numItems; i++) {

            if (app.project.rootItem.children[i].name == skinBinName && app.project.rootItem.children[i].type == 2) {
                folderExists = true;
                skinBin = app.project.rootItem.children[i];
            }
        }
        if (folderExists) {
            alert('Folder Exists!', 'Folder Exists', true);
        } else {
            skinBin = app.project.rootItem.createBin(skinBinName);
        }

        skinFile.push(File.openDialog('Select the gallery skin file...', '*.png').fsName);
        app.project.importFiles(skinFile, 0, skinBin, 0);
    } else {
        alert('Error importing skin', 'Error', true);
    }

}

function addVideoTracks(n) {
    var activeSeq = app.project.activeSequence;
    var qeSequence = qe.project.getActiveSequence(0);
    qeSequence.addTracks(n, activeSeq.videoTracks.numTracks, 0);
}

function addAudioTracks(n) {
    var activeSeq = app.project.activeSequence;
    var qeSequence = qe.project.getActiveSequence(0);
    qeSequence.addTracks(0, 0, n, 1, activeSeq.audioTracks.numTracks);
}

function composite(numberOfWindows, positionArray) {
    var activeSeq = app.project.activeSequence;
    var qeSequence = qe.project.getActiveSequence(0);
    var frameSize = [activeSeq.frameSizeHorizontal, activeSeq.frameSizeVertical];
    var numVideoTracks = activeSeq.videoTracks.numTracks;
    var numAudioTracks = activeSeq.audioTracks.numTracks;
    var videoTrack0 = activeSeq.videoTracks[0];
    var audioTrack0 = activeSeq.audioTracks[0];

    function moveAndScale(clip, x, y, s) {
        var pos = clip.components[1].properties[0];
        var scale = clip.components[1].properties[1];

        pos.setValue([x / frameSize[0], y / frameSize[1]]);
        scale.setValue(s);
    }

    function findSkin(regex) {
        for (var i = 0; i < app.project.rootItem.children.numItems; i++) {
            var itemName = app.project.rootItem.children[i].name;
            if (itemName.match(regex)) {
                return app.project.rootItem.children[i].children[0];
            }
        }
    }

    switch (numberOfWindows) {
        case 1:
            var positionArray1 = [positionArray['x_1_1'], positionArray['y_1_1'], positionArray['s_1_1']];
            for (var i = 0; i < positionArray1.length; i++) {
                if (positionArray1[i] == 0) {
                    alert('None of the position or scale values should be zero', 'Error', true);
                    return;
                }
            }
            break;
        case 2:
            var positionArray2 = [
                positionArray['x_2_1'],
                positionArray['y_2_1'],
                positionArray['s_2_1'],
                positionArray['x_2_2'],
                positionArray['y_2_2'],
                positionArray['s_2_2']
            ];
            for (var i = 0; i < positionArray2.length; i++) {
                if (positionArray2[i] == 0) {
                    alert('None of the position or scale values should be zero', 'Error', true);
                    return;
                }
            }
            break;
        case 3:
            var positionArray3 = [
                positionArray['x_3_1'],
                positionArray['y_3_1'],
                positionArray['s_3_1'],
                positionArray['x_3_2'],
                positionArray['y_3_2'],
                positionArray['s_3_2'],
                positionArray['x_3_3'],
                positionArray['y_3_3'],
                positionArray['s_3_3'],
            ];
            for (var i = 0; i < positionArray3.length; i++) {
                if (positionArray3[i] == 0) {
                    alert('None of the position or scale values should be zero', 'Error', true);
                    return;
                }
            }
            break;
        case 4:
            var positionArray3 = [
                positionArray['x_4_1'],
                positionArray['y_4_1'],
                positionArray['s_4_1'],
                positionArray['x_4_2'],
                positionArray['y_4_2'],
                positionArray['s_4_2'],
                positionArray['x_4_3'],
                positionArray['y_4_3'],
                positionArray['s_4_3'],
                positionArray['x_4_4'],
                positionArray['y_4_4'],
                positionArray['s_4_4']
            ];
            for (var i = 0; i < positionArray3.length; i++) {
                if (positionArray3[i] == 0) {
                    alert('None of the position or scale values should be zero', 'Error', true);
                    return;
                }
            }
            break;
        default:
            alert('Unsupported number of windows', 'Error', true);
    }

    if (activeSeq.videoTracks[0].clips.numItems < numberOfWindows) {
        alert('Not enough clips on the timeline', 'Not Enough Clips', true);
        return;
    }

    if (numberOfWindows >= numVideoTracks) {
        addVideoTracks(numberOfWindows + 1 - numVideoTracks);
    }

    if (numberOfWindows > numAudioTracks) {
        addAudioTracks(numberOfWindows - numAudioTracks);
    }

    for (var i = 1; i < numberOfWindows; i++) {
        var newVideoTrack = activeSeq.videoTracks[i];
        var newAudioTrack = activeSeq.audioTracks[i];
        var videoClipToMove = videoTrack0.clips[1];
        var audioClipToMove = audioTrack0.clips[1];

        newVideoTrack.overwriteClip(videoClipToMove.projectItem, 0);
        newAudioTrack.overwriteClip(audioClipToMove.projectItem, 0);
        $.write('\nClip ' + (i + 1) + ' coppied');

        videoClipToMove.remove(1, 1);
        audioClipToMove.remove(1, 1);
        $.write('\nClip ' + (i + 1) + ' deleted');

        activeSeq.audioTracks[i].setMute(1);
    }

    switch (numberOfWindows) {
        case 1:
            moveAndScale(activeSeq.videoTracks[0].clips[0], parseInt(positionArray['x_1_1']), parseInt(positionArray['y_1_1']), parseInt(positionArray['s_1_1']));
            break;
        case 2:
            moveAndScale(activeSeq.videoTracks[0].clips[0], parseInt(positionArray['x_2_1']), parseInt(positionArray['y_2_1']), parseInt(positionArray['s_2_1']));
            moveAndScale(activeSeq.videoTracks[1].clips[0], parseInt(positionArray['x_2_2']), parseInt(positionArray['y_2_2']), parseInt(positionArray['s_2_2']));
            break;
        case 3:
            moveAndScale(activeSeq.videoTracks[0].clips[0], parseInt(positionArray['x_3_1']), parseInt(positionArray['y_3_1']), parseInt(positionArray['s_3_1']));
            moveAndScale(activeSeq.videoTracks[1].clips[0], parseInt(positionArray['x_3_2']), parseInt(positionArray['y_3_2']), parseInt(positionArray['s_3_2']));
            moveAndScale(activeSeq.videoTracks[2].clips[0], parseInt(positionArray['x_3_3']), parseInt(positionArray['y_3_3']), parseInt(positionArray['s_3_3']));
            break;
        case 4:
            moveAndScale(activeSeq.videoTracks[0].clips[0], parseInt(positionArray['x_4_1']), parseInt(positionArray['y_4_1']), parseInt(positionArray['s_4_1']));
            moveAndScale(activeSeq.videoTracks[1].clips[0], parseInt(positionArray['x_4_2']), parseInt(positionArray['y_4_2']), parseInt(positionArray['s_4_2']));
            moveAndScale(activeSeq.videoTracks[2].clips[0], parseInt(positionArray['x_4_3']), parseInt(positionArray['y_4_3']), parseInt(positionArray['s_4_3']));
            moveAndScale(activeSeq.videoTracks[3].clips[0], parseInt(positionArray['x_4_4']), parseInt(positionArray['y_4_4']), parseInt(positionArray['s_4_4']));
            break;
        default:
            alert('Unsupported number of windows', 'Error', true);
    }

    var regex;
    var skin;
    var end = activeSeq.end;

    function findSkin(regex) {
        for (var i = 0; i < app.project.rootItem.children.numItems; i++) {
            var itemName = app.project.rootItem.children[i].name;
            if (itemName.match(regex)) {
                return app.project.rootItem.children[i].children[0];
            }
        }
    }

    switch (numberOfWindows) {
        case 1:
            regex = /(##_01_[A-Z]\w+)/g;
            skin = findSkin(regex);
            break;
        case 2:
            regex = /(##_02_[A-Z]\w+)/g;
            skin = findSkin(regex);
            break;
        case 3:
            regex = /(##_03_[A-Z]\w+)/g;
            skin = findSkin(regex);
            break;
        case 4:
            regex = /(##_04_[A-Z]\w+)/g;
            skin = findSkin(regex);
            break;
        default:
            alert('Unsupported number of windows', 'Error', true);
    }

    if (skin) {
        skin.setOutPoint(end, 4);
        activeSeq.videoTracks[numberOfWindows].overwriteClip(skin, 0);
    } else {
        alert('Skin not found', 'Skin Not Found', true);
        return;
    }

    alert('Compositing complete!\nMake sure to check it\'s in sync!', 'Junket Skinning Automation');
}